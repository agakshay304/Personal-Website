import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { eyebrowBones, typingBones } from "./boneData";

export const setupAnimations = (gltf: GLTF) => {
  const mixer = new THREE.AnimationMixer(gltf.scene);

  const playIntro = () => {
    const intro = gltf.animations.find((clip) => clip.name === "introAnimation");
    if (intro) {
      const action = mixer.clipAction(intro);
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }
    const blink = gltf.animations.find((clip) => clip.name === "Blink");
    if (blink) {
      setTimeout(() => {
        mixer.clipAction(blink).play().fadeIn(0.5);
      }, 2500);
    }
  };

  const loopClips = ["key1", "key2", "key5", "key6"];
  loopClips.forEach((name) => {
    const clip = THREE.AnimationClip.findByName(gltf.animations, name);
    if (clip) {
      const action = mixer.clipAction(clip);
      action.play();
      action.timeScale = 1.2;
    }
  });

  const typing = createBoneAction(gltf, mixer, "typing", typingBones);
  if (typing) {
    typing.play();
    typing.timeScale = 1.2;
  }

  const hoverHandler = (hoverDiv: HTMLDivElement | null) => {
    if (!hoverDiv) return () => undefined;
    const eyebrowAction = createBoneAction(gltf, mixer, "browup", eyebrowBones);
    if (!eyebrowAction) return () => undefined;
    eyebrowAction.clampWhenFinished = true;

    const onEnter = () => {
      eyebrowAction.reset();
      eyebrowAction.enabled = true;
      eyebrowAction.setEffectiveWeight(4);
      eyebrowAction.fadeIn(0.5).play();
    };
    const onLeave = () => eyebrowAction.fadeOut(0.5);

    hoverDiv.addEventListener("mouseenter", onEnter);
    hoverDiv.addEventListener("mouseleave", onLeave);

    return () => {
      hoverDiv.removeEventListener("mouseenter", onEnter);
      hoverDiv.removeEventListener("mouseleave", onLeave);
    };
  };

  return { mixer, playIntro, hoverHandler };
};

const createBoneAction = (
  gltf: GLTF,
  mixer: THREE.AnimationMixer,
  clipName: string,
  bones: string[]
) => {
  const clip = THREE.AnimationClip.findByName(gltf.animations, clipName);
  if (!clip) return null;
  const filtered = new THREE.AnimationClip(
    `${clip.name}_filtered`,
    clip.duration,
    clip.tracks.filter((track: THREE.KeyframeTrack) =>
      bones.some((bone) => track.name.includes(bone))
    )
  );
  return mixer.clipAction(filtered);
};
