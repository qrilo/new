import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManagerAPI } from "../adminsApi.jsx";

export const useCreateAdmin = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createManagerAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.error);
    },
  });
};
