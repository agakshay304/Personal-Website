import { Achievement, EducationEntry, SkillSection } from "../types/content";

export const skillContent: SkillSection[] = [
  { label: "Proficient", items: ["C/C++", "Java", "TypeScript", "Python"] },
  { label: "Experienced", items: ["Dart", "JavaScript"] },
  { label: "Familiar", items: ["Solidity", "Assembly"] },
  {
    label: "Frameworks",
    items: ["Flutter", "React", "Node.js", "Flutter BLoC"],
  },
  {
    label: "Platforms",
    items: ["Git", "GitHub", "GitHub Actions", "Google Firebase", "Pinata Cloud"],
  },
];

export const educationContent: EducationEntry[] = [
  {
    institution: "Manipal Institute of Technology",
    credential: "B.Tech in Computer Science and Engineering",
    location: "Manipal, Karnataka",
    period: "Oct 2020 - Aug 2024",
    notes: "Cumulative GPA: 8.59/10",
  },
  {
    institution: "St. Mary's School (ISC)",
    credential: "Class XII",
    location: "Mirzapur, Uttar Pradesh",
    period: "Apr 2017 - May 2019",
    notes: "Percentage: 86.25%",
  },
];

export const achievementContent: Achievement[] = [
  {
    label: "LeetCode",
    detail: "Global Rank 1571 / 25K+ in Weekly Contest (Top 6.2%)",
  },
  {
    label: "InterviewBit",
    detail: "Batch Rank 3 / 100+ (Top 3%)",
  },
];
