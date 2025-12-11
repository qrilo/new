import api from "../../shared/api/api.jsx";

export const getNotificationAPI = async ({ bankId }) => {
    try {
        const response = await api.get(`banks/${bankId}/notifications`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createNotificationAPI = async ({
    bankId,
    name,
    description,
    date,
    }) => {
    try {
        const response = await api.post(`banks/${bankId}/notifications`, {
            name,
            description,
            date,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateNotificationAPI = async ({
    notificationId,
    name,
    description,
    date,
    }) => {
    try {
        const response = await api.put(`notifications/${notificationId}`, {
            name,
            description,
            date,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteNotificationAPI = async ({ notificationId }) => {
    try {
        const response = await api.delete(`notifications/${notificationId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
