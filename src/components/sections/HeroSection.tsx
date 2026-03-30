import { KeyboardEvent, lazy, memo, Suspense, useCallback, useState } from "react";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { canRenderInteractiveHero } from "../../lib/performance/device";

const HeroScene = lazy(() => import("../three/HeroScene"));

const HeroSceneFallback = () => {
  return (
    <div className="hero-scene hero-scene--fallback" aria-hidden="true">
      <div className="hero-scene__placeholder-orb" />
      <div className="hero-scene__placeholder-badge">Activate interactive profile scene</div>
      <div className="hero-scene__rim" />
    </div>
  );
};

const HeroSection = () => {
  const { hero } = siteContent;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const canLoadScene = !prefersReducedMotion && canRenderInteractiveHero();
  const activateScene = useCallback(() => {
    if (canLoadScene) {
      setShouldLoadScene(true);
    }
  }, [canLoadScene]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateScene();
      }
    },
    [activateScene]
  );

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
      <div
        className="hero__character"
        role={canLoadScene && !shouldLoadScene ? "button" : undefined}
        tabIndex={canLoadScene && !shouldLoadScene ? 0 : undefined}
        aria-label={canLoadScene && !shouldLoadScene ? "Activate interactive profile scene" : undefined}
        onPointerEnter={activateScene}
        onFocusCapture={activateScene}
        onClick={activateScene}
        onKeyDown={handleKeyDown}
        onTouchStart={activateScene}
      >
        <Suspense fallback={<HeroSceneFallback />}>
          {shouldLoadScene && canLoadScene ? <HeroScene /> : <HeroSceneFallback />}
        </Suspense>
      </div>
    </section>
  );
};

export default memo(HeroSection);
