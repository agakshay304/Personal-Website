import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const ExperienceSection = () => {
  return (
    <section className="experience section-shell" id={SECTION_IDS.experience}>
      <SectionHeading kicker="Career" align="left">
        <span className="animate-title">Recent roles across consumer product and developer platform engineering.</span>
      </SectionHeading>
      <div className="experience__layout">
        <div className="experience__track">
          <div className="experience__track-dot" />
        </div>
        <div className="experience__cards">
          {siteContent.experience.map((entry) => (
            <article className="experience-card" key={`${entry.company}-${entry.role}`}>
              <div className="experience-card__header">
                <div>
                  <p className="experience-card__company">{entry.company}</p>
                  <h3>{entry.role}</h3>
                </div>
                <div className="experience-card__meta">
                  <p>{`${entry.start} - ${entry.end}`}</p>
                  <p>{entry.location}</p>
                </div>
              </div>
              <p className="experience-card__summary animate-copy">{entry.summary}</p>
              <ul className="experience-card__list">
                {entry.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
              <div className="experience-card__tech">
                {entry.tech?.map((technology) => (
                  <TagPill key={technology}>{technology}</TagPill>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
