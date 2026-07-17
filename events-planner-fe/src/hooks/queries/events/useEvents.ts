import { useQuery } from "@tanstack/react-query";

import { getEvents, getEventsByDateRange } from "~/api/events";
import { queryKeys } from "~/query/queryKeys";

interface UseEventsOptions {
  startDate?: string;
  endDate?: string;
}

export function useEvents(options?: UseEventsOptions) {
  const { startDate, endDate } = options ?? {};
  const hasRange = Boolean(startDate && endDate);

  return useQuery({
    queryKey: hasRange
      ? queryKeys.events.range(startDate!, endDate!)
      : queryKeys.events.all,
    queryFn: () =>
      hasRange ? getEventsByDateRange(startDate!, endDate!) : getEvents(),
  });
}
