import * as THREE from "three";

export const trackPointer = (
  setMouse: (mouse: { x: number; y: number }) => void,
  setInterpolation: (value: { x: number; y: number }) => void
) => {
  let resetTimeoutId = 0;
  let interpolationTimeoutId = 0;

  const onPointerMove = (event: PointerEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x: mouseX, y: mouseY });
  };

  const onPointerUp = () => {
    window.clearTimeout(resetTimeoutId);
    window.clearTimeout(interpolationTimeoutId);
    resetTimeoutId = window.setTimeout(() => {
      setMouse({ x: 0, y: 0 });
      setInterpolation({ x: 0.03, y: 0.03 });
      interpolationTimeoutId = window.setTimeout(
        () => setInterpolation({ x: 0.1, y: 0.2 }),
        1000
      );
    }, 1200);
  };

  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerup", onPointerUp, { passive: true });

  return () => {
    window.clearTimeout(resetTimeoutId);
    window.clearTimeout(interpolationTimeoutId);
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  };
};

export const rotateHead = (
  headBone: THREE.Object3D | null,
  mouse: { x: number; y: number },
  interpolation: { x: number; y: number }
) => {
  if (!headBone) return;
  if (window.scrollY < 200) {
    const maxRotation = Math.PI / 6;
    headBone.rotation.y = THREE.MathUtils.lerp(
      headBone.rotation.y,
      mouse.x * maxRotation,
      interpolation.y
    );
    const vertical = THREE.MathUtils.clamp(mouse.y, -0.3, 0.4);
    headBone.rotation.x = THREE.MathUtils.lerp(
      headBone.rotation.x,
      -vertical - 0.5 * maxRotation,
      interpolation.x
    );
  } else if (window.innerWidth > 1024) {
    headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -0.4, 0.03);
    headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, -0.3, 0.03);
  }
};
