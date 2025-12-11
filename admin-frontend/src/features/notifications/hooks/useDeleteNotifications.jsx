import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationAPI } from "../notificationsApi.jsx";

export const useDeleteNotifications = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotificationAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
