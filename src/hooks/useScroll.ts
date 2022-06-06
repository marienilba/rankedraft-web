import { useCallback, useRef } from "react";

type Options = {
  offsetTop?: number;
  behavior?: ScrollBehavior;
};

export function useScroll(options?: Options) {
  const ref: any = useRef(null);

  const scrollTo = useCallback(() => {
    if (typeof window !== undefined)
      if (ref.current) {
        window.scrollTo({
          top: options?.offsetTop
            ? ref.current.offsetTop - options.offsetTop
            : ref.current.offsetTop,
          left: 0,
          behavior: options?.behavior || "smooth",
        });
      }
  }, [ref]);

  return [ref, scrollTo];
}
