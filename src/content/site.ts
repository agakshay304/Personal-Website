import { AboutContent, ContactInfo, HeroContent } from "../types/content";

export const heroContent: HeroContent = {
  greeting: "Hello, I'm",
  name: "Akshay Gupta",
  title: "Software Development Engineer I - Amazon",
  punchline:
    "I design high-impact commerce experiences across detail page, cart, checkout, and order flows.",
  summary: [
    "I currently build engagement and rewards systems at Amazon, converting unsettled shoppers into loyal customers at 150M+ scale.",
    "Previously, I strengthened developer platforms at Western Digital by shipping observability, metadata, and build automation for globally distributed firmware teams.",
  ],
  primaryCta: {
    label: "Email Akshay",
    href: "mailto:agakshay304@gmail.com",
  },
  secondaryCta: {
    label: "Download Resume",
    href: "/assets/resume/Akshay_Gupta_Resume.pdf",
    external: true,
  },
};

export const aboutContent: AboutContent = {
  headline:
    "Product-minded engineer focused on growth surfaces, instrumentation, and reliable developer platforms.",
  description: [
    "I work best where customer experience and systems design intersect: designing the architecture, writing the implementation, and driving launch decisions with clear operational guardrails.",
    "Across Amazon and Western Digital, my scope has ranged from rewards and lifecycle engagement widgets to tracing frameworks, metadata services, and workflow automation that reduce friction for engineering teams.",
  ],
};

export const contactContent: ContactInfo = {
  email: "agakshay304@gmail.com",
  phone: "+91 95544 28644",
  location: "India | UTC+05:30",
  resumeUrl: "/assets/resume/Akshay_Gupta_Resume.pdf",
};
