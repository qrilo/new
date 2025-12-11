import { useQuery } from "@tanstack/react-query";
import { getBanksApi } from "../banksApi.jsx";

export const useBanks = ({ bankType, enabled = true }) => {
    return useQuery({
        queryKey: ["banks"],
        queryFn: () => getBanksApi({
            bankType
        }),
        refetchOnWindowFocus: false,
        enabled,
        initialData: [],
    });
};
