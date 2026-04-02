import { PropsWithChildren, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const SmoothScroller = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || window.innerWidth < 1024) {
      return undefined;
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.6,
      speed: 1.2,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });
    smoother.scrollTop(0);
    return () => {
      smoother.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroller;
