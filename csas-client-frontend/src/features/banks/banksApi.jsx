import api from "../../shared/api/api.jsx";

export const getBankInfo = async () => {
  try {
    const response = await api.get(`bank`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLeadAPI = async ({ leadId }) => {
  try {
    const response = await api.get(`csas/${leadId}/info`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
