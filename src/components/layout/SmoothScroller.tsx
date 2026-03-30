import { PropsWithChildren, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { hasDesktopMotionBudget } from "../../lib/performance/device";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroller = ({ children }: PropsWithChildren) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !hasDesktopMotionBudget()) {
      return undefined;
    }

    let isCancelled = false;
    let dispose: () => void = () => {};

    import("gsap/ScrollSmoother").then(({ ScrollSmoother }) => {
      if (isCancelled) {
        return;
      }

      gsap.registerPlugin(ScrollSmoother);
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        speed: 1,
        effects: false,
        ignoreMobileResize: true,
      });
      smoother.scrollTop(0);
      dispose = () => smoother.kill();
    });

    return () => {
      isCancelled = true;
      dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroller;
