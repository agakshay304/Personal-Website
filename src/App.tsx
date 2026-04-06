import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppLayout from "./components/layout/AppLayout";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection";
import { LoadingProvider } from "./app/providers/LoadingProvider";
import { useLoading } from "./app/providers/loading-context";
import { animateCopy, animateTitle } from "./lib/animation/splitText";

gsap.registerPlugin(ScrollTrigger);

const PortfolioApp = () => {
  const { isReady } = useLoading();

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    gsap.fromTo(
      [".navbar", ".social-rail"],
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      [".hero__eyebrow", ".hero__title-line", ".hero__summary", ".hero__actions"],
      { autoAlpha: 0, y: 60, filter: "blur(8px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    animateTitle({ selector: ".animate-title" });
    animateCopy({ selector: ".animate-copy" });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.refresh();
    };
  }, [isReady]);

  return (
    <AppLayout>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
      <ProjectsSection />
      <TechStackSection />
      <ContactSection />
    </AppLayout>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <PortfolioApp />
    </LoadingProvider>
  );
};

export default App;
