import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEvent } from "~/api/events";
import { queryKeys } from "~/query/queryKeys";
import type { UpdateEventDto } from "~/types";

type UpdateEventVariables = {
  id: string;
  event: UpdateEventDto;
};

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, event }: UpdateEventVariables) => updateEvent(id, event),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.events.all,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.events.detail(variables.id),
      });
    },
  });
}
