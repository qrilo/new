import api from "../../shared/api/api";
import { buildQueryString } from "../../shared/utils/queryBuilder.jsx";

export const getBanksApi = async ({ bankType }) => {
  try {
    const query = buildQueryString({ bankType })
    const response = await api.get(`banks?${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createBankApi = async ({
  fullname,
  email,
  phone,
  comment,
  pinLength,
  expenses,
  contact,
  code,
  bankType
}) => {
  try {
    const response = await api.post(`banks`, {
      fullname,
      email,
      phone,
      comment,
      pinLength,
      expenses,
      contact,
      code,
      bankType
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBankApi = async ({
  id,
  fullname,
  email,
  phone,
  comment,
  pinLength,
  expenses,
  contact,
}) => {
  try {
    const response = await api.put(`banks/${id}`, {
      fullname,
      email,
      phone,
      comment,
      pinLength,
      expenses,
      contact,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteBankApi = async ({ id }) => {
  try {
    const response = await api.delete(`banks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCsasAccountsAPI = async ({ id }) => {
  try {
    const response = await api.get(`csas/${id}/accounts`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCsasAccountAPI = async ({
  id,
  name,
  balance,
  hash,
  showNewPayment,
}) => {
  try {
    const response = await api.post(`csas/${id}/accounts`, {
      name,
      balance,
      hash,
      showNewPayment,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCsasAccountAPI = async ({
  id,
  name,
  balance,
  hash,
  showNewPayment,
}) => {
  try {
    const response = await api.put(`csas/accounts/${id}`, {
      name,
      balance,
      hash,
      showNewPayment,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCsasAccountAPI = async ({ id }) => {
  try {
    const response = await api.delete(`csas/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTransactionAPI = async ({
  accountId,
  name,
  amount,
  date,
  description,
  transactionType,
  type,
}) => {
  try {
    const response = await api.post(`csas/accounts/${accountId}/transactions`, {
      name,
      amount,
      date,
      description,
      transactionType,
      type,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTransactionAPI = async ({
  id,
  name,
  amount,
  date,
  description,
  transactionType,
  type,
}) => {
  try {
    const response = await api.put(`csas/transactions/${id}`, {
      name,
      amount,
      date,
      description,
      transactionType,
      type,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTransactionAPI = async ({ id }) => {
  try {
    const response = await api.delete(`csas/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNotificationCsasAPI = async ({ id }) => {
  try {
    const response = await api.get(`csas/${id}/notifications`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createNotificationCsasAPI = async ({
  id,
  name,
  description,
  date,
}) => {
  try {
    const response = await api.post(`csas/${id}/notifications`, {
      name,
      description,
      date,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateNotificationCsasAPI = async ({
  transactionId,
  name,
  description,
  date,
}) => {
  try {
    const response = await api.put(`csas/notifications/${transactionId}`, {
      name,
      description,
      date,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteNotificationCsasAPI = async ({ transactionId }) => {
  try {
    const response = await api.delete(`csas/notifications/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
