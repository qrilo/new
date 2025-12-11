import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBankApi } from "../banksApi.jsx";

export const useUpdateBank = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBankApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["banks"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
