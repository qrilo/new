import api from "../../shared/api/api.jsx";

export const getNotificationApi = async ({ id }) => {
  try {
    const response = await api.get(`vub/${id}/notifications`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
