import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotificationAPI } from "../notificationsApi.jsx";

export const useCreateNotification = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotificationAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
