import * as THREE from "three";

export const trackPointer = (
  setMouse: (mouse: { x: number; y: number }) => void,
  setInterpolation: (value: { x: number; y: number }) => void
) => {
  const onMouseMove = (event: MouseEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x: mouseX, y: mouseY });
  };

  const onTouchMove = (event: TouchEvent) => {
    const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    setMouse({ x: mouseX, y: mouseY });
  };

  const onTouchEnd = () => {
    setTimeout(() => {
      setMouse({ x: 0, y: 0 });
      setInterpolation({ x: 0.03, y: 0.03 });
      setTimeout(() => setInterpolation({ x: 0.1, y: 0.2 }), 1000);
    }, 1200);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);

  return () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
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
    headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * maxRotation, interpolation.y);
    const vertical = THREE.MathUtils.clamp(mouse.y, -0.3, 0.4);
    headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -vertical - 0.5 * maxRotation, interpolation.x);
  } else if (window.innerWidth > 1024) {
    headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -0.4, 0.03);
    headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, -0.3, 0.03);
  }
};
