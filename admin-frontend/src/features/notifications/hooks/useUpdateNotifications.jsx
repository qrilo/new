import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationAPI } from "../notificationsApi.jsx";

export const useUpdateNotifications = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
