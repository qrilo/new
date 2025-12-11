import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccountAPI } from "../accountsAPI.jsx";

export const useCreateAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccountAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
