import { useQuery } from "@tanstack/react-query";

import { getUserById } from "~/api/users";
import { queryKeys } from "~/query/queryKeys";

export function useUserById(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}
