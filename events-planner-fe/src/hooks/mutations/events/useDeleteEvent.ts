import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEvent } from "~/api/events";
import { queryKeys } from "~/query/queryKeys";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.all,
      });
      queryClient.removeQueries({
        queryKey: queryKeys.events.detail(id),
      });
    },
  });
}
