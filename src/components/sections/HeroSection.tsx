import {
  KeyboardEvent,
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { canRenderInteractiveHero } from "../../lib/performance/device";
import MobileHeroScene from "../three/MobileHeroScene";

const HeroScene = lazy(() => import("../three/HeroScene"));

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

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
  const [firstName, ...restName] = useMemo(() => hero.name.split(" "), [hero.name]);
  const lastName = restName.join(" ");
  const activateScene = useCallback(() => {
    if (canLoadScene) {
      setShouldLoadScene(true);
    }
  }, [canLoadScene]);

  useEffect(() => {
    if (!canLoadScene) {
      return undefined;
    }

    const idleWindow = window as IdleWindow;
    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(() => activateScene(), {
        timeout: 1400,
      });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => activateScene(), 900);
    return () => window.clearTimeout(timeoutId);
  }, [activateScene, canLoadScene]);

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
      <div className="hero__stage">
        <div className="hero__ambient hero__ambient--left" aria-hidden="true" />
        <div className="hero__ambient hero__ambient--right" aria-hidden="true" />
        <div className="hero__copy hero__copy--intro">
          <p className="hero__eyebrow">{hero.greeting}</p>
          <h1 className="hero__name hero__title-line">
            <span>{firstName}</span>
            {lastName ? <span>{lastName}</span> : null}
          </h1>
          <p className="hero__meta hero__title-line">{hero.title}</p>
        </div>
        <div className="hero__copy hero__copy--identity">
          <p className="hero__identity-kicker hero__title-line">{hero.stageLabel}</p>
          <div
            className="hero__identity hero__title-line"
            aria-label={`${hero.stagePrimary} ${hero.stageSecondary}`}
          >
            <span className="hero__identity-primary">{hero.stagePrimary}</span>
            <span className="hero__identity-secondary">{hero.stageSecondary}</span>
          </div>
          <div className="hero__identity-shadow" aria-hidden="true">
            <span>{hero.stageSecondary}</span>
            <span>{hero.stagePrimary}</span>
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
            {canLoadScene ? (
              shouldLoadScene ? (
                <HeroScene />
              ) : (
                <HeroSceneFallback />
              )
            ) : (
              <MobileHeroScene />
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
