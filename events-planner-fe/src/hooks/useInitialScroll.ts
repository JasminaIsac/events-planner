import { useEffect, useRef } from "react";

export function useInitialScroll<T extends HTMLElement>(top: number) {
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top,
    });
  }, [top]);

  return scrollRef;
}
