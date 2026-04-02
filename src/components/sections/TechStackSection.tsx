import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const TechStackSection = () => {
  return (
    <section className="tech-stack section-shell" id={SECTION_IDS.tech}>
      <SectionHeading kicker="Technical Breadth" align="center">
        <span className="animate-title">Hands-on with product surfaces, backend systems, observability, and mobile delivery.</span>
      </SectionHeading>
      <div className="tech-stack__fallback">Interactive tech scene will be introduced next.</div>
      <div className="tech-stack__grid">
        {siteContent.skills.map((group) => (
          <article className="tech-stack__group" key={group.label}>
            <h3>{group.label}</h3>
            <div className="tech-stack__items">
              {group.items.map((item) => (
                <TagPill key={item}>{item}</TagPill>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
