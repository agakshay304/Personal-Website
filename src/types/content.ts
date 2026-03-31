export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type HeroContent = {
  greeting: string;
  name: string;
  title: string;
  punchline: string;
  summary: string[];
  primaryCta: CTA;
  secondaryCta?: CTA;
};

export type AboutContent = {
  headline: string;
  description: string[];
};

export type ExpertiseArea = {
  title: string;
  focus: string;
  description: string;
  skills: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  achievements: string[];
  tech?: string[];
};

export type ProjectEntry = {
  name: string;
  description: string;
  highlights: string[];
  tools: string[];
  linkLabel?: string;
  link?: string;
  image: string;
};

export type SkillSection = {
  label: string;
  items: string[];
};

export type EducationEntry = {
  institution: string;
  credential: string;
  location: string;
  period: string;
  notes?: string;
};

export type Achievement = {
  label: string;
  detail: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
};

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type SiteContent = {
  hero: HeroContent;
  about: AboutContent;
  expertise: ExpertiseArea[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillSection[];
  education: EducationEntry[];
  achievements: Achievement[];
  socials: SocialLink[];
  contact: ContactInfo;
};
