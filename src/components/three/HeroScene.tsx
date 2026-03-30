import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { setupCharacterScroll, setupSectionTimelines } from "../../lib/animation/characterScroll";
import { setupAnimations } from "../../lib/three/animations";
import { loadHeroCharacter } from "../../lib/three/characterLoader";
import { trackPointer, rotateHead } from "../../lib/three/interactions";
import { createLighting } from "../../lib/three/lighting";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const disposeMaterial = (material: THREE.Material) => {
  Object.values(material).forEach((value) => {
    if (value instanceof THREE.Texture) {
      value.dispose();
    }
  });
  material.dispose();
};

const disposeObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) {
      return;
    }

    const mesh = child as THREE.Mesh;
    mesh.geometry.dispose();
    if (Array.isArray(mesh.material)) {
      mesh.material.forEach(disposeMaterial);
      return;
    }
    disposeMaterial(mesh.material);
  });
};

const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const camera = new THREE.PerspectiveCamera(14.5, 1, 0.1, 1000);
    const clock = new THREE.Clock();
    const lighting = createLighting(scene);
    const mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };

    let cleanupHover: () => void = () => {};
    let cleanupCharacterScroll: () => void = () => {};
    let cleanupSectionTimelines: () => void = () => {};
    let cleanupPointer: () => void = () => {};
    let frameId = 0;
    let introTimeoutId = 0;
    let resizeFrameId = 0;
    let mixer: THREE.AnimationMixer | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let characterRoot: THREE.Object3D | null = null;
    let isDisposed = false;
    let isSceneVisible = true;
    let isDocumentVisible = !document.hidden;

    const canAnimate = () => isSceneVisible && isDocumentVisible && !prefersReducedMotion;

    const renderFrame = () => {
      rotateHead(headBone, mouse, interpolation);
      lighting.setPointLight(screenLight);
      if (mixer && canAnimate()) {
        mixer.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (frameId || !canAnimate()) {
        return;
      }

      clock.getDelta();
      const animate = () => {
        frameId = window.requestAnimationFrame(animate);
        renderFrame();
      };
      animate();
    };

    const stopLoop = () => {
      if (!frameId) {
        return;
      }
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const renderOnce = () => {
      if (!isDisposed) {
        renderFrame();
      }
    };

    const syncLoop = () => {
      if (canAnimate()) {
        startLoop();
        return;
      }
      stopLoop();
      renderOnce();
    };

    const resize = () => {
      const bounds = mountNode.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      camera.aspect = bounds.width / bounds.height;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();
      renderOnce();
      ScrollTrigger.refresh();
    };

    const queueResize = () => {
      if (resizeFrameId) {
        window.cancelAnimationFrame(resizeFrameId);
      }

      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0;
        resize();
      });
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isSceneVisible = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0.08 }
    );

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      syncLoop();
    };

    mountNode.appendChild(renderer.domElement);
    visibilityObserver.observe(mountNode);
    queueResize();

    document.addEventListener("visibilitychange", onVisibilityChange);

    cleanupPointer = trackPointer(
      (next) => {
        mouse.x = next.x;
        mouse.y = next.y;
      },
      (next) => {
        interpolation.x = next.x;
        interpolation.y = next.y;
      }
    );

    loadHeroCharacter()
      .then((gltf) => {
        if (isDisposed) {
          disposeObject(gltf.scene);
          return;
        }

        const character = gltf.scene;
        const animationController = setupAnimations(gltf);
        characterRoot = character;
        scene.add(character);
        mixer = animationController.mixer;
        cleanupHover = animationController.hoverHandler(hoverRef.current);
        cleanupCharacterScroll = prefersReducedMotion
          ? () => {}
          : setupCharacterScroll(character, camera);
        cleanupSectionTimelines = prefersReducedMotion ? () => {} : setupSectionTimelines();
        headBone = character.getObjectByName("spine006") ?? null;
        screenLight = character.getObjectByName("screenlight") ?? null;
        if (prefersReducedMotion) {
          lighting.turnOnLights(true);
        }
        renderOnce();
        syncLoop();

        if (!prefersReducedMotion) {
          introTimeoutId = window.setTimeout(() => {
            if (!isDisposed) {
              lighting.turnOnLights();
              animationController.playIntro();
            }
          }, 300);
        }
      })
      .catch((error) => {
        console.error("Unable to load hero scene", error);
      });

    window.addEventListener("resize", queueResize, { passive: true });

    return () => {
      isDisposed = true;
      stopLoop();
      window.clearTimeout(introTimeoutId);
      window.cancelAnimationFrame(resizeFrameId);
      window.removeEventListener("resize", queueResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      visibilityObserver.disconnect();
      cleanupPointer();
      cleanupHover();
      cleanupCharacterScroll();
      cleanupSectionTimelines();
      if (characterRoot) {
        disposeObject(characterRoot);
      }
      scene.clear();
      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div className="hero-scene">
      <div className="hero-scene__mount" ref={mountRef} />
      <div className="hero-scene__rim" />
      <div className="hero-scene__hover" ref={hoverRef} />
    </div>
  );
};

export default HeroScene;
