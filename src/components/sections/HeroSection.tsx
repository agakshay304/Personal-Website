import HeroScene from "../three/HeroScene";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const HeroSection = () => {
  const { hero } = siteContent;

  return (
    <section className="hero section-shell" id={SECTION_IDS.hero}>
      <div className="hero__copy">
        <p className="hero__eyebrow">{hero.greeting}</p>
        <div className="hero__title">
          <h1 className="hero__title-line">{hero.name}</h1>
          <p className="hero__role hero__title-line">{hero.title}</p>
        </div>
        <p className="hero__punchline hero__summary">{hero.punchline}</p>
        <div className="hero__summary">
          {hero.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="hero__actions">
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
      </div>
      <div className="hero__character">
        <HeroScene />
      </div>
    </section>
  );
};

export default HeroSection;
