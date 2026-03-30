import { lazy, Suspense, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppLayout from "./components/layout/AppLayout";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import { setupTextAnimations } from "./lib/animation/splitText";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const TechStackSection = lazy(() => import("./components/sections/TechStackSection"));
const revealTargets = [
  ".navbar",
  ".social-rail",
  ".hero__eyebrow",
  ".hero__title-line",
  ".hero__summary",
  ".hero__actions",
];

gsap.registerPlugin(ScrollTrigger);

const PortfolioApp = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let cleanupTextAnimations: () => void = () => {};
    let isCancelled = false;

    const introTween = gsap.fromTo(
      revealTargets,
      { autoAlpha: 0, y: 48 },
      {
        autoAlpha: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.2 : 0.9,
        stagger: prefersReducedMotion ? 0 : 0.1,
        ease: "power3.out",
        delay: 0.15,
        overwrite: "auto",
      }
    );

    setupTextAnimations({ enabled: !prefersReducedMotion }).then((cleanup) => {
      if (isCancelled) {
        cleanup();
        return;
      }
      cleanupTextAnimations = cleanup;
      ScrollTrigger.refresh();
    });

    return () => {
      isCancelled = true;
      introTween.kill();
      cleanupTextAnimations();
    };
  }, [prefersReducedMotion]);

  return (
    <AppLayout>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
      <ProjectsSection />
      <Suspense fallback={<div className="section-shell tech-stack__fallback-shell" />}>
        <TechStackSection />
      </Suspense>
      <ContactSection />
    </AppLayout>
  );
};

const App = () => {
  return <PortfolioApp />;
};

export default App;
