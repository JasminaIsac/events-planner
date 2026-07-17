import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "~/auth/useAuth";
import { queryKeys } from "~/query/queryKeys";
import type { RegisterRequest } from "~/types/auth";

export function useRegister() {
  const queryClient = useQueryClient();
  const { register } = useAuth();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.current,
      });
    },
  });
}
