import api from "../../shared/api/api.jsx";

export const getChatsAPI = async ({ receiverId }) => {
  try {
    const url = receiverId
      ? `chat-messages?ReceiverId=${receiverId}`
      : `chat-messages`;

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createChatMessageAPI = async ({ receiverId, message }) => {
  try {
    const response = await api.post(`chat-messages`, { receiverId, message });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
