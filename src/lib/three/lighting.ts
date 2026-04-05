import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

export const createLighting = (scene: THREE.Scene) => {
  const rimLight = new THREE.DirectionalLight(0x5eead4, 0);
  rimLight.position.set(-0.47, -0.32, -1);
  rimLight.castShadow = true;
  rimLight.shadow.mapSize.width = 1024;
  rimLight.shadow.mapSize.height = 1024;
  rimLight.shadow.camera.near = 0.5;
  rimLight.shadow.camera.far = 50;
  scene.add(rimLight);

  const pointLight = new THREE.PointLight(0x22d3ee, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  new RGBELoader().load("/models/hero_env.hdr?v=1", (texture: THREE.DataTexture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
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

    pointLight.intensity =
      material.opacity > 0.9 ? material.emissiveIntensity * 20 : 0;
  };

  const turnOnLights = () => {
    const tween = { duration: 2, ease: "power2.inOut" };
    gsap.to(scene, { environmentIntensity: 0.64, ...tween });
    gsap.to(rimLight, { intensity: 1, ...tween });
  };

  return { setPointLight, turnOnLights };
};
