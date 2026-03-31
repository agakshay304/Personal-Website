import { AboutContent, ContactInfo, HeroContent } from "../types/content";

export const heroContent: HeroContent = {
  greeting: "Hello, I'm",
  name: "Akshay Gupta",
  title: "Software Engineer",
  punchline: "Building product and platform experiences with a clean delivery model.",
  summary: [
    "This content layer starts as a lightweight scaffold and will be replaced with resume-backed copy.",
  ],
  primaryCta: {
    label: "Get in touch",
    href: "mailto:agakshay304@gmail.com",
  },
  secondaryCta: {
    label: "Resume coming soon",
    href: "<<ADD_RESUME_URL>>",
  },
};

export const aboutContent: AboutContent = {
  headline: "Product engineering, developer tooling, and thoughtful systems design.",
  description: [
    "The portfolio content will be refined section by section as the site structure settles.",
  ],
};

export const contactContent: ContactInfo = {
  email: "agakshay304@gmail.com",
  phone: "+91 95544 28644",
  location: "India | UTC+05:30",
  resumeUrl: "<<ADD_RESUME_URL>>",
};
