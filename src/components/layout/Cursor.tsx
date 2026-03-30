import { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return undefined;
    }

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      cursor.style.display = "none";
      return undefined;
    }

    let frameId = 0;
    let isLockedToTarget = false;
    let activeTarget: HTMLElement | null = null;
    const cursorPos = { x: 0, y: 0 };
    const mousePos = { x: 0, y: 0 };

    const applyTransform = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      if (!isLockedToTarget) {
        cursorPos.x += (mousePos.x - cursorPos.x) * 0.16;
        cursorPos.y += (mousePos.y - cursorPos.y) * 0.16;
        applyTransform(cursorPos.x, cursorPos.y);
      }

      const deltaX = Math.abs(mousePos.x - cursorPos.x);
      const deltaY = Math.abs(mousePos.y - cursorPos.y);
      if (!isLockedToTarget && (deltaX > 0.2 || deltaY > 0.2)) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }
      frameId = 0;
    };

    const requestTick = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const resetCursor = () => {
      cursor.classList.remove("cursor--icons", "cursor--disabled");
      isLockedToTarget = false;
      activeTarget = null;
      requestTick();
    };

    const onPointerMove = (event: PointerEvent) => {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
      requestTick();
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (!target || target === activeTarget) {
        return;
      }

      activeTarget = target;
      const cursorMode = target.dataset.cursor;
      isLockedToTarget = cursorMode === "icons";
      cursor.classList.toggle("cursor--icons", cursorMode === "icons");
      cursor.classList.toggle("cursor--disabled", cursorMode === "disable");

      if (cursorMode === "icons") {
        const rect = target.getBoundingClientRect();
        cursorPos.x = rect.left;
        cursorPos.y = rect.top;
        mousePos.x = rect.left;
        mousePos.y = rect.top;
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        applyTransform(rect.left, rect.top);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!activeTarget) {
        return;
      }

      const relatedTarget = event.relatedTarget as Node | null;
      if (relatedTarget && activeTarget.contains(relatedTarget)) {
        return;
      }

      resetCursor();
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return <div className="cursor" ref={cursorRef} />;
};

export default Cursor;
