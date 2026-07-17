import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "~/api/users";
import { queryKeys } from "~/query/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.users.current,
    queryFn: getCurrentUser,
  });
}
