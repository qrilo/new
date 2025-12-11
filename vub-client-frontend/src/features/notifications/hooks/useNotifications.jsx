import { useQuery } from "@tanstack/react-query";
import { getNotificationApi } from "../notificationsApi";

export const useNotifications = ({ id, refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["vub-notifications"],
    queryFn: () => getNotificationApi({ id }),
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    initialData: [],
  });
};
