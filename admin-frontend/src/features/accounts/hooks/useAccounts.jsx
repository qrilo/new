import { useQuery } from "@tanstack/react-query";
import { getAccountsAPI } from "../accountsAPI";

export const useAccounts = ({ bankId, enabled = true }) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAccountsAPI({ bankId }),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
  });
};
