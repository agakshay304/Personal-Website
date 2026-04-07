import { ExperienceEntry } from "../types/content";

export const experienceContent: ExperienceEntry[] = [
  {
    company: "Amazon",
    role: "Software Development Engineer I",
    start: "May 2025",
    end: "Present",
    location: "Bengaluru, India",
    summary:
      "Own engagement and rewards experiences across detail page, cart, checkout, and order journeys.",
    achievements: [
      "Shipped three net-new widget experiences across four high-traffic journeys, reaching 150M+ users.",
      "Contributed to lifecycle systems that convert unsettled customers into retained users, increasing settled customer share by 3%.",
      "Authored and reviewed LLD and HLD documents spanning design, observability, and production rollout strategy.",
    ],
    tech: [
      "Java",
      "React",
      "Node.js",
      "AWS DynamoDB",
      "CloudWatch",
      "DAX",
      "ECS",
    ],
  },
  {
    company: "Western Digital",
    role: "Software Developer",
    start: "July 2024",
    end: "April 2025",
    location: "Bengaluru, India",
    summary:
      "Expanded internal observability infrastructure and developer tooling for firmware engineering teams.",
    achievements: [
      "Implemented logging, tracing, and metrics capabilities that increased framework adoption by more than 30%.",
      "Built AWS and GitHub metadata modules that improved storage workflows and extensibility.",
      "Extended a Python-based build tool with two services that streamlined firmware build execution.",
    ],
    tech: [
      "Python",
      "Grafana",
      "Prometheus",
      "Loki",
      "Elasticsearch",
      "Jaeger",
    ],
  },
  {
    company: "Western Digital",
    role: "Software Development Engineer Intern",
    start: "January 2024",
    end: "June 2024",
    location: "Bengaluru, India",
    summary:
      "Built workflow automation for engineering teams operating across India, the US, and Israel.",
    achievements: [
      "Created a framework unifying four product pipelines across multiple regions.",
      "Automated GitHub, JIRA, and Confluence integrations to improve project tracking and execution visibility.",
    ],
    tech: ["Python", "REST APIs", "GitHub Actions", "Docker"],
  },
];
