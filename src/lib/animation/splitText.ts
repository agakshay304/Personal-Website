import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger);

type TextAnimationOptions = {
  enabled?: boolean;
};

type Cleanup = () => void;

export const setupTextAnimations = async ({ enabled = true }: TextAnimationOptions = {}) => {
  if (!enabled || window.innerWidth < 900) {
    return () => undefined;
  }

  const { SplitText: SplitTextPlugin } = (await import("gsap/SplitText")) as {
    SplitText: typeof SplitText;
  };

  gsap.registerPlugin(SplitTextPlugin);

  const splits: SplitText[] = [];
  const animations: Array<gsap.core.Tween | gsap.core.Timeline> = [];

  const registerSplitAnimation = (
    selector: string,
    splitType: "lines,words" | "words",
    getTargets: (split: SplitText) => Element[],
    getVars: (element: Element) => gsap.TweenVars
  ) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const split = new SplitTextPlugin(element, {
        type: splitType,
        linesClass: "split-line",
      });
      splits.push(split);
      animations.push(gsap.from(getTargets(split), getVars(element)));
    });
  };

  registerSplitAnimation(
    ".animate-copy",
    "lines,words",
    (split) => split.lines,
    (element) => ({
      autoAlpha: 0,
      y: 28,
      ease: "power2.out",
      duration: 0.72,
      stagger: 0.08,
      scrollTrigger: {
        trigger: element,
        start: window.innerWidth <= 1024 ? "top 78%" : "top 68%",
        once: true,
      },
    })
  );

  registerSplitAnimation(
    ".animate-title",
    "words",
    (split) => split.words,
    (element) => ({
      autoAlpha: 0,
      y: 44,
      ease: "power3.out",
      duration: 0.78,
      stagger: 0.05,
      scrollTrigger: {
        trigger: element,
        start: window.innerWidth <= 1024 ? "top 82%" : "top 72%",
        once: true,
      },
    })
  );

  return (() => {
    animations.forEach((animation) => animation.kill());
    splits.forEach((split) => split.revert());
  }) satisfies Cleanup;
};
