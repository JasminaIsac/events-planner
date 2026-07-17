import { useEffect, useState } from "react";

type UseNowOptions = {
  intervalMs?: number;
};

export function useNow(options?: UseNowOptions) {
  const { intervalMs = 60_000 } = options ?? {};

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
}
