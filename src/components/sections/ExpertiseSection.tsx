import { memo } from "react";
import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const ExpertiseSection = () => {
  return (
    <section className="expertise section-shell" id={SECTION_IDS.expertise}>
      <SectionHeading kicker="Focus Areas" align="left">
        <span className="animate-title">Building product systems with measurable impact.</span>
      </SectionHeading>
      <div className="expertise__grid">
        {siteContent.expertise.map((item) => (
          <article className="expertise-card" key={item.title}>
            <p className="expertise-card__focus">{item.focus}</p>
            <h3>{item.title}</h3>
            <p className="animate-copy">{item.description}</p>
            <div className="expertise-card__skills">
              {item.skills.map((skill) => (
                <TagPill key={skill}>{skill}</TagPill>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default memo(ExpertiseSection);
