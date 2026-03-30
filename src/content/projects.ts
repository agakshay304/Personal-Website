import { ProjectEntry } from "../types/content";
import { withBase } from "../lib/assets";

export const projectContent: ProjectEntry[] = [
  {
    name: "Travulator",
    description:
      "A mobile road-trip cost estimator that turns route and vehicle details into a fast travel budget.",
    highlights: [
      "Combines trip inputs with distance calculations to estimate travel cost in two simple steps.",
      "Published as a Flutter application for travelers who need fast pre-trip planning on mobile.",
    ],
    tools: ["Flutter", "REST APIs", "Google Maps Platform"],
    linkLabel: "Open on Google Play",
    link: "https://play.google.com/store/apps/details?id=com.pagdev.travulator",
    image: withBase("/assets/images/projects/travulator.svg"),
  },
  {
    name: "GPTutor",
    description:
      "An AI-assisted learning product that generates topic explainers and follow-up quizzes.",
    highlights: [
      "Uses LLM-backed responses to provide summaries and evaluate learner understanding.",
      "Targets both mobile and web delivery to keep the learning loop lightweight and accessible.",
    ],
    tools: ["Flutter", "REST APIs", "LLM integration"],
    linkLabel: "Open web app",
    link: "https://gptutor.web.app/",
    image: withBase("/assets/images/projects/gptutor.svg"),
  },
];
