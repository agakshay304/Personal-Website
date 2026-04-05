import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

export const loadHeroCharacter = async (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): Promise<GLTF> => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const encrypted = await decryptFile("/models/hero.enc?v=1", "MyCharacter12");
  const blob = new Blob([encrypted]);
  const url = URL.createObjectURL(blob);

  return new Promise<GLTF>((resolve, reject) => {
    loader.load(
      url,
      async (gltf) => {
        const character = gltf.scene;
        await renderer.compileAsync(character, camera, scene);
        character.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const cloned = (mesh.material as THREE.Material).clone();
              if (mesh.name === "BODY.SHIRT") {
                (cloned as THREE.MeshStandardMaterial).color = new THREE.Color("#5eead4");
              }
              if (mesh.name === "Pant") {
                (cloned as THREE.MeshStandardMaterial).color = new THREE.Color("#030712");
              }
              mesh.material = cloned;
            }
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });
        resolve(gltf);
        dracoLoader.dispose();
      },
      undefined,
      (error) => reject(error)
    );
  });
};
