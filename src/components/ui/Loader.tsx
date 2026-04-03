import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useLoading } from "../../app/providers/loading-context";

interface LoaderProps {
  percent: number;
}

const Loader = ({ percent }: LoaderProps) => {
  const { complete } = useLoading();
  const [isExiting, setIsExiting] = useState(false);
  const hasStartedExit = useRef(false);

  useEffect(() => {
    if (percent < 100 || hasStartedExit.current) {
      return undefined;
    }

    hasStartedExit.current = true;
    const exitTimeoutId = window.setTimeout(() => {
      setIsExiting(true);
    }, 500);
    const completeTimeoutId = window.setTimeout(() => {
      complete();
    }, 1400);

    return () => {
      window.clearTimeout(exitTimeoutId);
      window.clearTimeout(completeTimeoutId);
    };
  }, [percent, complete]);

  return (
    <div className={`loader ${isExiting ? "loader--exit" : ""}`}>
      <header className="loader__header">
        <a href="/" className="loader__brand" data-cursor="disable">
          AG
        </a>
        <div className="loader__marquee">
          <Marquee>
            <span>Software Development Engineer</span>
            <span>Full Stack Product Builder</span>
            <span>Systems & Observability</span>
          </Marquee>
        </div>
      </header>
      <div className="loader__body">
        <div className="loader__progress" data-cursor="disable">
          <div className="loader__progress-inner" style={{ width: `${percent}%` }} />
          <div className="loader__status">
            Loading <span>{percent}%</span>
          </div>
        </div>
        <p className="loader__hint">Optimizing assets for the 3D hero experience...</p>
      </div>
    </div>
  );
};

export default Loader;
