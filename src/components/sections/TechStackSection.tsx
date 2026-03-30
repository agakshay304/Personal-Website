import { Suspense, lazy, memo, useEffect, useRef, useState } from "react";
import SectionHeading from "../ui/SectionHeading";
import TagPill from "../ui/TagPill";
import { siteContent } from "../../content";
import { SECTION_IDS } from "../../constants/layout";
import { useInView } from "../../hooks/useInView";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { canRenderInteractiveTechScene } from "../../lib/performance/device";

const TechSphereScene = lazy(() => import("../three/TechSphereScene"));

const TechStackSection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isSceneInView = useInView(sceneRef, { rootMargin: "320px 0px", threshold: 0.15 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const canLoadScene = !prefersReducedMotion && canRenderInteractiveTechScene();

  useEffect(() => {
    if (isSceneInView && canLoadScene) {
      setShouldLoadScene(true);
    }
  }, [canLoadScene, isSceneInView]);

  return (
    <section className="tech-stack section-shell" id={SECTION_IDS.tech}>
      <SectionHeading kicker="Technical Breadth" align="center">
        <span className="animate-title">
          Hands-on with product surfaces, backend systems, observability, and mobile delivery.
        </span>
      </SectionHeading>
      <div className="tech-stack__scene" ref={sceneRef}>
        <Suspense fallback={<div className="tech-stack__fallback">Loading tech stack scene...</div>}>
          {shouldLoadScene && canLoadScene ? (
            <TechSphereScene isActive={isSceneInView} />
          ) : (
            <div className="tech-stack__fallback">Interactive stack scene loads on demand.</div>
          )}
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

export default memo(TechStackSection);
