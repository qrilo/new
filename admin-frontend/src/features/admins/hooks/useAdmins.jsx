import { useQuery } from "@tanstack/react-query";
import { getManagersAPI } from "../adminsApi.jsx";

export const useAdmins = ({ enabled = true }) => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => getManagersAPI(),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
  });
};
