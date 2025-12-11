import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccountAPI } from "../accountsAPI.jsx";

export const useDeleteAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccountAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
