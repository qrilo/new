import { useQuery } from "@tanstack/react-query";
import { getVubAPI } from "../vubApi";

export const useVub = ({ refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["vub"],
    queryFn: () => getVubAPI(),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
    refetchInterval: refetchInterval,
  });
};
