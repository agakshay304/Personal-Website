import { memo, useCallback, useState } from "react";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";

const ExpertiseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const setActiveCard = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section className="expertise section-shell" id={SECTION_IDS.expertise}>
      <div className="what-i-do__layout">
        <div className="what-i-do__heading">
          <p className="what-i-do__kicker">Focus Areas</p>
          <h2 className="what-i-do__title animate-title">
            <span>WHAT</span>
            <span>
              I <em>DO</em>
            </span>
          </h2>
        </div>
        <div className="what-i-do__surface">
          <div className="what-i-do__surface-frame" aria-hidden="true" />
          <div className="what-i-do__cards">
            {siteContent.expertise.map((item, index) => (
              <button
                type="button"
                key={item.title}
                className={
                  index === activeIndex
                    ? "what-i-do__card what-i-do__card--active"
                    : "what-i-do__card"
                }
                onMouseEnter={() => setActiveCard(index)}
                onFocus={() => setActiveCard(index)}
                onClick={() => setActiveCard(index)}
                aria-pressed={index === activeIndex}
              >
                <div className="what-i-do__card-corners" aria-hidden="true" />
                <div className="what-i-do__card-border" aria-hidden="true" />
                <div className="what-i-do__card-content">
                  <h3>{item.title}</h3>
                  <h4>{item.focus}</h4>
                  <p className="animate-copy">{item.description}</p>
                  <p className="what-i-do__skills-label">Skillset &amp; tools</p>
                  <div className="what-i-do__tags">
                    {item.skills.map((skill) => (
                      <span className="what-i-do__tag" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="what-i-do__arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ExpertiseSection);
