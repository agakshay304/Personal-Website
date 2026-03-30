import { memo } from "react";

const MobileHeroScene = () => {
  return (
    <div className="hero-lite" aria-hidden="true">
      <div className="hero-lite__glow hero-lite__glow--left" />
      <div className="hero-lite__glow hero-lite__glow--right" />
      <div className="hero-lite__spotlight" />
      <div className="hero-lite__figure">
        <div className="hero-lite__head">
          <span className="hero-lite__ear hero-lite__ear--left" />
          <span className="hero-lite__ear hero-lite__ear--right" />
          <span className="hero-lite__hair" />
          <span className="hero-lite__brow hero-lite__brow--left" />
          <span className="hero-lite__brow hero-lite__brow--right" />
          <span className="hero-lite__eye hero-lite__eye--left" />
          <span className="hero-lite__eye hero-lite__eye--right" />
          <span className="hero-lite__glasses" />
          <span className="hero-lite__nose" />
          <span className="hero-lite__mouth" />
          <span className="hero-lite__beard" />
        </div>
        <div className="hero-lite__neck" />
        <div className="hero-lite__torso" />
      </div>
      <div className="hero-lite__shadow" />
    </div>
  );
};

export default memo(MobileHeroScene);
