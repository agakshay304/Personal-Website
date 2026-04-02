import SectionHeading from "../ui/SectionHeading";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const AboutSection = () => {
  const { about } = siteContent;

  return (
    <section className="about section-shell" id={SECTION_IDS.about}>
      <SectionHeading kicker="About" align="left">
        <span className="animate-title">{about.headline}</span>
      </SectionHeading>
      <div className="about__body animate-copy">
        {about.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
