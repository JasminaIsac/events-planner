import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateUser } from "~/api/users";
import { queryKeys } from "~/query/queryKeys";

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateUser,

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.all,
      });
      queryClient.removeQueries({
        queryKey: queryKeys.users.detail(id),
      });
    },
  });
}
