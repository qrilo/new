import { useQuery } from "@tanstack/react-query";
import { getChatsAPI } from "../chatsApi";

export const useChats = ({ receiverId, refetchInterval, enabled = true }) => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      getChatsAPI({
        receiverId,
      }),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
    refetchInterval,
  });
};
