import { memo } from "react";

const MobileHeroScene = () => {
  return (
    <div className="hero-lite" aria-hidden="true">
      <div className="hero-lite__glow hero-lite__glow--left" />
      <div className="hero-lite__glow hero-lite__glow--right" />
      <div className="hero-lite__frame">
        <div className="hero-lite__grid" />
        <div className="hero-lite__medallion">
          <span>AG</span>
        </div>
        <div className="hero-lite__figure">
          <div className="hero-lite__head" />
          <div className="hero-lite__torso" />
        </div>
        <div className="hero-lite__chip hero-lite__chip--role">Amazon</div>
        <div className="hero-lite__chip hero-lite__chip--focus">Commerce</div>
        <div className="hero-lite__chip hero-lite__chip--system">Platforms</div>
      </div>
      <div className="hero-lite__shadow" />
    </div>
  );
};

export default memo(MobileHeroScene);
