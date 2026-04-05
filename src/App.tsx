import AppLayout from "./components/layout/AppLayout";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ExpertiseSection from "./components/sections/ExpertiseSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection";
import { LoadingProvider } from "./app/providers/LoadingProvider";

const App = () => {
  return (
    <LoadingProvider>
      <AppLayout>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </AppLayout>
    </LoadingProvider>
  );
};

export default App;
