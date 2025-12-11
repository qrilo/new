import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransactionAPI } from "../accountsApi.jsx";

export const useDeleteTransaction = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
