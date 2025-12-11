import api from "../../shared/api/api.jsx";

export const getAccountByIdAPI = async ({ accountId }) => {
  try {
    const response = await api.get(`accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
