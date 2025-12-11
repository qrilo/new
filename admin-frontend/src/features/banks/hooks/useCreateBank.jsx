import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBankApi } from "../banksApi.jsx";

export const useCreateBank = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["banks"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
