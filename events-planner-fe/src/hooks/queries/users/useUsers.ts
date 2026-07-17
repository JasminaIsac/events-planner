import { useQuery } from "@tanstack/react-query";

import { getUsers } from "~/api/users";
import { queryKeys } from "~/query/queryKeys";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: getUsers,
  });
}
