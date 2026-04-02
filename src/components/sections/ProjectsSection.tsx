import { useState } from "react";
import { MdArrowBack, MdArrowForward, MdArrowOutward } from "react-icons/md";
import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";
import { isPlaceholderValue } from "../../utils/placeholders";

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = siteContent.projects[activeIndex];

  const goToNext = () =>
    setActiveIndex((current) => (current + 1) % siteContent.projects.length);
  const goToPrevious = () =>
    setActiveIndex((current) =>
      current === 0 ? siteContent.projects.length - 1 : current - 1
    );

  return (
    <section className="projects section-shell" id={SECTION_IDS.projects}>
      <SectionHeading kicker="Selected Work" align="left">
        <span className="animate-title">Side projects focused on practical utility and accessible product UX.</span>
      </SectionHeading>
      <div className="projects__carousel">
        <div className="projects__copy">
          <div className="projects__counter">{`0${activeIndex + 1}`}</div>
          <h3>{activeProject.name}</h3>
          <p className="animate-copy">{activeProject.description}</p>
          <ul className="projects__highlights">
            {activeProject.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <div className="projects__tools">
            {activeProject.tools.map((tool) => (
              <TagPill key={tool}>{tool}</TagPill>
            ))}
          </div>
          {isPlaceholderValue(activeProject.link ?? "") ? (
            <p className="projects__placeholder">{activeProject.linkLabel}</p>
          ) : (
            <a
              className="projects__link"
              href={activeProject.link}
              target="_blank"
              rel="noreferrer"
            >
              {activeProject.linkLabel}
              <MdArrowOutward />
            </a>
          )}
        </div>
        <div className="projects__preview">
          <button
            className="projects__nav projects__nav--left"
            aria-label="Previous project"
            onClick={goToPrevious}
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <img
            src={activeProject.image}
            alt={activeProject.name}
          />
          <button
            className="projects__nav projects__nav--right"
            aria-label="Next project"
            onClick={goToNext}
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>
        </div>
      </div>
      <div className="projects__dots">
        {siteContent.projects.map((project, index) => (
          <button
            key={project.name}
            className={index === activeIndex ? "projects__dot projects__dot--active" : "projects__dot"}
            aria-label={`Open ${project.name}`}
            onClick={() => setActiveIndex(index)}
            data-cursor="disable"
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
