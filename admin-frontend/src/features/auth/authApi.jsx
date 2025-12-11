import api from "../../shared/api/api.jsx";

export const loginUserAPI = async ({ username, password }) => {
  try {
    const response = await api.post(`auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
