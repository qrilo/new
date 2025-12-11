import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactionAPI } from "../accountsApi.jsx";

export const useCreateTransaction = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
