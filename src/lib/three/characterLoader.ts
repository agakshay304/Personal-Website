import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const heroLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
configureDracoLoader();

let heroModelUrlPromise: Promise<string> | null = null;

function configureDracoLoader() {
  dracoLoader.setDecoderPath("/draco/");
  heroLoader.setDRACOLoader(dracoLoader);
}

const getHeroModelUrl = async () => {
  if (!heroModelUrlPromise) {
    heroModelUrlPromise = decryptFile("/models/hero.enc?v=1", "MyCharacter12").then(
      (encrypted) => URL.createObjectURL(new Blob([encrypted]))
    );
  }

  return heroModelUrlPromise;
};

export const loadHeroCharacter = async (): Promise<GLTF> => {
  const url = await getHeroModelUrl();

  return new Promise<GLTF>((resolve, reject) => {
    heroLoader.load(
      url,
      (gltf) => {
        const character = gltf.scene;
        character.traverse((child: THREE.Object3D) => {
          if (!(child as THREE.Mesh).isMesh) {
            return;
          }

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
        });

        resolve(gltf);
      },
      undefined,
      (error) => reject(error)
    );
  });
};
