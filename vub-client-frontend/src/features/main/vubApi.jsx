import api from "../../shared/api/api";

export const getVubAPI = async () => {
  try {
    const response = await api.get(`bank`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
