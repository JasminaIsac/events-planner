import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "~/auth/useAuth";
import { queryKeys } from "~/query/queryKeys";
import type { LoginRequest } from "~/types/auth";

export function useLogin() {
  const queryClient = useQueryClient();
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.current,
      });
    },
  });
}
