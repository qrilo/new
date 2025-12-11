import api from "../../shared/api/api.jsx";

export const getManagersAPI = async () => {
  try {
    const response = await api.get(`users/admins`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createManagerAPI = async ({ username, fullname, password }) => {
  try {
    const response = await api.post(`auth/register`, {
      username,
      fullname,
      password,
      role: "admin",
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
