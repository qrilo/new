import api from "../../shared/api/api.jsx";

export const loginUserAPI = async ({ code }) => {
  try {
    const response = await api.post(`auth/bank`, { code });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
