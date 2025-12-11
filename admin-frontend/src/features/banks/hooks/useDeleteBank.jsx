import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBankApi } from "../banksApi.jsx";

export const useDeleteBank = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBankApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["banks"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
