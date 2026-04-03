import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Loader from "../../components/ui/Loader";
import { LoadingContext } from "./loading-context";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 86) {
          window.clearInterval(interval);
          return current;
        }
        return current + Math.max(1, Math.round((90 - current) / 12));
      });
    }, 140);

    return () => window.clearInterval(interval);
  }, [progress]);

  const reportProgress = useCallback((value: number) => {
    setProgress((prev) => Math.min(100, Math.max(prev, value)));
  }, []);

  const complete = useCallback(() => {
    setProgress(100);
    setReady(true);
  }, []);

  const value = useMemo(
    () => ({ progress, reportProgress, complete, isReady }),
    [progress, reportProgress, complete, isReady]
  );

  return (
    <LoadingContext.Provider value={value}>
      {!isReady && <Loader percent={progress} />}
      <main className={isReady ? "app-shell ready" : "app-shell"}>{children}</main>
    </LoadingContext.Provider>
  );
};
