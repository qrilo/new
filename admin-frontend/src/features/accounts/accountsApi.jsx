import api from "../../shared/api/api.jsx";

export const getAccountsAPI = async ({ bankId }) => {
  try {
    const response = await api.get(`banks/${bankId}/accounts`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createAccountAPI = async ({
  bankId,
  name,
  balance,
  hash,
  showNewPayment,
  expenses,
}) => {
  try {
    const response = await api.post(`banks/${bankId}/accounts`, {
      name,
      balance,
      hash,
      showNewPayment,
      expenses,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAccountAPI = async ({ accountId }) => {
  try {
    const response = await api.delete(`accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAccountAPI = async ({
  accountId,
  name,
  balance,
  hash,
  showNewPayment,
  expenses,
}) => {
  try {
    const response = await api.put(`accounts/${accountId}`, {
      name,
      balance,
      hash,
      showNewPayment,
      expenses,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTransactionAPI = async ({
  accountId,
  name = "",
  amount,
  date,
  description,
  type = "",
  transactionType,
}) => {
  try {
    const response = await api.post(`accounts/${accountId}/transactions`, {
      name,
      amount,
      date,
      description,
      type,
      transactionType,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTransactionAPI = async ({
  transactionId,
  name,
  amount,
  date,
  description,
  type,
  transactionType,
}) => {
  try {
    const response = await api.put(`transactions/${transactionId}`, {
      name,
      amount,
      date,
      description,
      type,
      transactionType,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTransactionAPI = async ({ transactionId }) => {
  try {
    const response = await api.delete(`transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
