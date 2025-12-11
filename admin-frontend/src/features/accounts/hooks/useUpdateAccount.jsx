import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountAPI } from "../accountsAPI.jsx";

export const useUpdateAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccountAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
