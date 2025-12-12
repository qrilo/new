import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatMessageAPI } from "../chatsApi";

export const useCreateChat = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatMessageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      // message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
