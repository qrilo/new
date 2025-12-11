import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionAPI } from "../accountsApi.jsx";

export const useUpdateTransaction = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
