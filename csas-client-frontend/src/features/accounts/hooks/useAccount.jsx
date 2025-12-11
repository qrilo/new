import { useQuery } from "@tanstack/react-query";
import { getAccountByIdAPI } from "../accountsApi";

export const useAccount = ({ accountId, refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["account-by-id"],
    queryFn: () => getAccountByIdAPI({ accountId }),
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    initialData: [],
  });
};
