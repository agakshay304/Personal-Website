import { memo } from "react";
import SectionHeading from "../ui/SectionHeading";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const AboutSection = () => {
  const { about, hero } = siteContent;
  const paragraphs = [...hero.summary, ...about.description];

  return (
    <section className="about section-shell" id={SECTION_IDS.about}>
      <SectionHeading kicker="About" align="left">
        <span className="animate-title">{about.headline}</span>
      </SectionHeading>
      <p className="about__lead animate-copy">{hero.punchline}</p>
      <div className="about__body animate-copy">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="about__actions">
        <a className="button button--primary" href={hero.primaryCta.href}>
          {hero.primaryCta.label}
        </a>
        {hero.secondaryCta && (
          <a
            className="button button--ghost"
            href={hero.secondaryCta.href}
            target={hero.secondaryCta.external ? "_blank" : undefined}
            rel={hero.secondaryCta.external ? "noreferrer" : undefined}
          >
            {hero.secondaryCta.label}
          </a>
        )}
      </div>
    </section>
  );
};

export default memo(AboutSection);
