import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useLoading } from "../../app/providers/loading-context";
import { setupCharacterScroll, setupSectionTimelines } from "../../lib/animation/characterScroll";
import { setupAnimations } from "../../lib/three/animations";
import { loadHeroCharacter } from "../../lib/three/characterLoader";
import { trackPointer, rotateHead } from "../../lib/three/interactions";
import { createLighting } from "../../lib/three/lighting";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const { reportProgress } = useLoading();

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    const camera = new THREE.PerspectiveCamera(14.5, 1, 0.1, 1000);
    const clock = new THREE.Clock();
    const lighting = createLighting(scene);
    let cleanupHover: () => void = () => {};
    let cleanupCharacterScroll: () => void = () => {};
    let cleanupSectionTimelines: () => void = () => {};
    let cleanupPointer: () => void = () => {};
    let frameId = 0;
    let mixer: THREE.AnimationMixer | null = null;
    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let isDisposed = false;
    const mouse = { x: 0, y: 0 };
    const interpolation = { x: 0.1, y: 0.2 };

    const resize = () => {
      const bounds = mountNode.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = bounds.width / bounds.height;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();
      ScrollTrigger.refresh();
    };

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    mountNode.appendChild(renderer.domElement);
    resize();

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

    loadHeroCharacter(renderer, scene, camera)
      .then((gltf) => {
        if (isDisposed) {
          return;
        }

        const character = gltf.scene;
        const animationController = setupAnimations(gltf);
        scene.add(character);
        mixer = animationController.mixer;
        cleanupHover = animationController.hoverHandler(hoverRef.current);
        cleanupCharacterScroll = setupCharacterScroll(character, camera);
        cleanupSectionTimelines = setupSectionTimelines();
        headBone = character.getObjectByName("spine006") ?? null;
        screenLight = character.getObjectByName("screenlight") ?? null;
        reportProgress(100);
        window.setTimeout(() => {
          if (!isDisposed) {
            lighting.turnOnLights();
            animationController.playIntro();
          }
        }, 300);
      })
      .catch((error) => {
        console.error("Unable to load hero scene", error);
        reportProgress(100);
      });

    const renderScene = () => {
      frameId = window.requestAnimationFrame(renderScene);
      rotateHead(headBone, mouse, interpolation);
      lighting.setPointLight(screenLight);
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    };

    renderScene();
    window.addEventListener("resize", resize);

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      cleanupPointer();
      cleanupHover();
      cleanupCharacterScroll();
      cleanupSectionTimelines();
      scene.clear();
      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [reportProgress]);

  return (
    <div className="hero-scene">
      <div className="hero-scene__mount" ref={mountRef} />
      <div className="hero-scene__rim" />
      <div className="hero-scene__hover" ref={hoverRef} />
    </div>
  );
};

export default HeroScene;
