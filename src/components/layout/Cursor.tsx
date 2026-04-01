import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let hoverLocked = false;
    const cursorPos = { x: 0, y: 0 };
    const mousePos = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
    };

    const render = () => {
      if (!hoverLocked) {
        const delay = 7;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.2 });
      }
      requestAnimationFrame(render);
    };

    const handleHover = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      hoverLocked = target.dataset.cursor === "icons";
      cursor.classList.toggle("cursor--icons", hoverLocked);
      cursor.classList.toggle("cursor--disabled", target.dataset.cursor === "disable");
      if (hoverLocked) {
        const rect = target.getBoundingClientRect();
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.2 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
      }
    };

    const resetHover = () => {
      cursor.classList.remove("cursor--icons", "cursor--disabled");
      hoverLocked = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.querySelectorAll("[data-cursor]").forEach((element) => {
      element.addEventListener("mouseenter", handleHover);
      element.addEventListener("mouseleave", resetHover);
    });

    render();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("[data-cursor]").forEach((element) => {
        element.removeEventListener("mouseenter", handleHover);
        element.removeEventListener("mouseleave", resetHover);
      });
    };
  }, []);

  return <div className="cursor" ref={cursorRef} />;
};

export default Cursor;
