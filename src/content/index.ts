import { SiteContent } from "../types/content";
import { achievementContent, educationContent, skillContent } from "./skills";
import { aboutContent, contactContent, heroContent } from "./site";
import { expertiseContent } from "./expertise";
import { experienceContent } from "./experience";
import { projectContent } from "./projects";
import { socialContent } from "./socials";

export const siteContent: SiteContent = {
  hero: heroContent,
  about: aboutContent,
  expertise: expertiseContent,
  experience: experienceContent,
  projects: projectContent,
  skills: skillContent,
  education: educationContent,
  achievements: achievementContent,
  socials: socialContent,
  contact: contactContent,
};

export {
  achievementContent,
  educationContent,
  expertiseContent,
  experienceContent,
  heroContent,
  projectContent,
  skillContent,
  socialContent,
};
