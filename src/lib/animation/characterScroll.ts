import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const setupCharacterScroll = (
  character: THREE.Object3D | null,
  camera: THREE.PerspectiveCamera
) => {
  if (!character || window.innerWidth < 1024) {
    return () => undefined;
  }

  const head = character.getObjectByName("spine005");
  const monitorRoot = character.getObjectByName("Plane004");
  const screenLight = character.getObjectByName("screenlight") as THREE.Mesh | null;
  let monitorMaterial: THREE.Material | undefined;

  monitorRoot?.traverse((child: THREE.Object3D) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && mesh.material) {
      monitorMaterial = mesh.material as THREE.Material;
      const standardMaterial = mesh.material as THREE.MeshStandardMaterial;
      standardMaterial.transparent = true;
      standardMaterial.opacity = 0;
    }
  });

  if (screenLight?.material) {
    const standardMaterial = screenLight.material as THREE.MeshStandardMaterial;
    standardMaterial.transparent = true;
    standardMaterial.opacity = 0;
  }

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  heroTimeline
    .to(".hero__copy", { opacity: 0, y: 60, duration: 0.8 }, 0)
    .to(camera.position, { z: 22, duration: 1.1 }, 0)
    .to(".hero__character", { xPercent: -20, duration: 1.1 }, 0)
    .to(character.rotation, { y: 0.66, duration: 1 }, 0);

  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  aboutTimeline
    .to(camera.position, { z: 72, y: 8.4, duration: 3.5 }, 0)
    .to(character.rotation, { y: 0.92, x: 0.12, duration: 2.4 }, 0)
    .to(head?.rotation || { x: 0 }, { x: 0.6, duration: 2 }, 0)
    .to(".hero__character", { xPercent: -10, duration: 2.2 }, 0)
    .to(".about", { yPercent: 16, duration: 2.5 }, 0)
    .to(".about", { opacity: 0, duration: 1.2, delay: 1.2 }, 0)
    .fromTo(
      monitorMaterial || {},
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.5 },
      0
    )
    .fromTo(
      screenLight?.material || {},
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 1 },
      0
    )
    .fromTo(
      ".expertise__grid",
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.8, delay: 1.5 },
      0
    );

  const expertiseTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".expertise",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  expertiseTimeline
    .to(".hero__character", { yPercent: -110, duration: 3.5 }, 0)
    .to(character.rotation, { x: -0.04, duration: 2 }, 0);

  return () => {
    heroTimeline.kill();
    aboutTimeline.kill();
    expertiseTimeline.kill();
  };
};

export const setupSectionTimelines = () => {
  const experienceTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".experience",
      start: "top 38%",
      end: "bottom center",
      scrub: true,
      invalidateOnRefresh: true,
      id: "projects-trigger",
    },
  });

  experienceTimeline
    .fromTo(
      ".experience__track",
      { maxHeight: "12%", opacity: 0 },
      { maxHeight: "100%", opacity: 1, duration: 0.8 },
      0
    )
    .fromTo(
      ".experience-card",
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, stagger: 0.14, duration: 0.6 },
      0
    );

  return () => {
    experienceTimeline.kill();
  };
};
