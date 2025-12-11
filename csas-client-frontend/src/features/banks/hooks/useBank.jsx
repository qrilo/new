import { useQuery } from "@tanstack/react-query";
import { getBankInfo } from "../banksApi.jsx";

export const useBank = ({ refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["csas-info"],
    queryFn: () => getBankInfo(),
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    initialData: [],
  });
};
