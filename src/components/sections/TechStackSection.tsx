import { Suspense, lazy } from "react";
import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const TechSphereScene = lazy(() => import("../three/TechSphereScene"));

const TechStackSection = () => {
  return (
    <section className="tech-stack section-shell" id={SECTION_IDS.tech}>
      <SectionHeading kicker="Technical Breadth" align="center">
        <span className="animate-title">Hands-on with product surfaces, backend systems, observability, and mobile delivery.</span>
      </SectionHeading>
      <div className="tech-stack__scene">
        <Suspense fallback={<div className="tech-stack__fallback">Loading tech stack scene...</div>}>
          <TechSphereScene />
        </Suspense>
      </div>
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
