import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "~/api/users";
import { queryKeys } from "~/query/queryKeys";
import type { UpdateUserDto } from "~/types";

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UpdateUserDto) => updateCurrentUser(user),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.current,
      });
    },
  });
}
