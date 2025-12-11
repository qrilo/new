import api from "../../shared/api/api.jsx";

export const getBanksApi = async () => {
  try {
    const response = await api.get(`bank`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
