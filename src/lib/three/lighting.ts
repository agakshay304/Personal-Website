import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";
import { withBase } from "../assets";

const rgbeLoader = new RGBELoader();
let environmentTexturePromise: Promise<THREE.DataTexture> | null = null;

const loadEnvironmentTexture = async () => {
  if (!environmentTexturePromise) {
    environmentTexturePromise = new Promise((resolve, reject) => {
      rgbeLoader.load(
        withBase("/models/hero_env.hdr?v=1"),
        (texture: THREE.DataTexture) => resolve(texture),
        undefined,
        (error) => reject(error)
      );
    });
  }

  return environmentTexturePromise;
};

export const createLighting = (scene: THREE.Scene) => {
  const rimLight = new THREE.DirectionalLight(0x5eead4, 0);
  rimLight.position.set(-0.47, -0.32, -1);
  scene.add(rimLight);

  const pointLight = new THREE.PointLight(0x22d3ee, 0, 60, 2.8);
  pointLight.position.set(3, 12, 4);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xf4efe6, 0.2);
  scene.add(ambientLight);

  loadEnvironmentTexture()
    .then((texture) => {
      scene.environment = texture;
      scene.environment.mapping = THREE.EquirectangularReflectionMapping;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    })
    .catch(() => {
      scene.environment = null;
    });

  const setPointLight = (screenLight: THREE.Object3D | null) => {
    if (!screenLight || !(screenLight instanceof THREE.Mesh)) {
      return;
    }

    const material = screenLight.material;
    if (!(material instanceof THREE.MeshStandardMaterial)) {
      pointLight.intensity = 0;
      return;
    }

    pointLight.intensity = material.opacity > 0.9 ? material.emissiveIntensity * 14 : 0;
  };

  const turnOnLights = (immediate = false) => {
    if (immediate) {
      scene.environmentIntensity = 0.52;
      rimLight.intensity = 0.82;
      ambientLight.intensity = 0.34;
      return;
    }

    const tween = { duration: 1.35, ease: "power2.out" };
    gsap.to(scene, { environmentIntensity: 0.52, ...tween });
    gsap.to(rimLight, { intensity: 0.82, ...tween });
    gsap.to(ambientLight, { intensity: 0.34, ...tween });
  };

  return { setPointLight, turnOnLights };
};
