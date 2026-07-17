import { useQuery } from "@tanstack/react-query";

import { getEventById } from "~/api/events";
import { queryKeys } from "~/query/queryKeys";

export function useEventById(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
}
