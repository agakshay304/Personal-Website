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
      </div>
      <div className="hero__character">
        <div className="hero-scene hero-scene--placeholder">3D hero scene coming next.</div>
      </div>
    </section>
  );
};

export default HeroSection;
