import { useQuery } from "@tanstack/react-query";
import { getBanksApi } from "../banksApi.jsx";

export const useBank = ({ refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: () => getBanksApi(),
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
  });
};
