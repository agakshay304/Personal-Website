import { Achievement, EducationEntry, SkillSection } from "../types/content";

export const skillContent: SkillSection[] = [
  { label: "Languages", items: ["Java", "TypeScript", "Python"] },
  { label: "Frameworks", items: ["React", "Node.js", "Flutter"] },
];

export const educationContent: EducationEntry[] = [
  {
    institution: "Manipal Institute of Technology",
    credential: "B.Tech in Computer Science and Engineering",
    location: "Manipal, Karnataka",
    period: "2020 - 2024",
  },
];

export const achievementContent: Achievement[] = [
  {
    label: "Competitive programming",
    detail: "Detailed rankings will be mapped from the resume.",
  },
];
