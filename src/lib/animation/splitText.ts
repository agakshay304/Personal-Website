import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type SplitConfig = {
  selector: string;
  trigger?: Element | null;
};

export const animateCopy = ({ selector, trigger }: SplitConfig) => {
  if (window.innerWidth < 900) {
    return;
  }
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const split = new SplitText(element, {
      type: "lines,words",
      linesClass: "split-line",
    });
    gsap.from(split.words, {
      autoAlpha: 0,
      y: 60,
      ease: "power3.out",
      duration: 1,
      stagger: 0.02,
      scrollTrigger: {
        trigger: trigger ?? element,
        start: window.innerWidth <= 1024 ? "top 70%" : "20% 60%",
        toggleActions: "play pause resume reverse",
      },
    });
  });
};

export const animateTitle = ({ selector, trigger }: SplitConfig) => {
  if (window.innerWidth < 900) {
    return;
  }
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const split = new SplitText(element, {
      type: "chars,words",
      linesClass: "split-line",
    });
    gsap.from(split.chars, {
      autoAlpha: 0,
      y: 80,
      rotate: 10,
      stagger: 0.03,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: trigger ?? element,
        start: window.innerWidth <= 1024 ? "top 75%" : "30% 70%",
        toggleActions: "play pause resume reverse",
      },
    });
  });
};
