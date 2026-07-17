import { useMutation } from "@tanstack/react-query";

import { changePassword } from "~/api/users";
import type { ChangePasswordDto } from "~/types";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => changePassword(data),
  });
}
