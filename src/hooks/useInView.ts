import { RefObject, useEffect, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

export const useInView = <T extends Element>(
  ref: RefObject<T>,
  { rootMargin = "0px", threshold = 0.1 }: UseInViewOptions = {}
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return isInView;
};
