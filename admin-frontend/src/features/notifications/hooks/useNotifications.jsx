import { useQuery } from "@tanstack/react-query";
import { getNotificationAPI } from "../notificationsApi.jsx";

export const useNotifications = ({ bankId, enabled = true }) => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotificationAPI({ bankId }),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
  });
};
