import API from '../utils/api';

export const getAvailableIntegrations = async (payload = {}) => {
    const { params = {} } = payload;
    try {
        const resp = await API.get('/available/integrations', { params });
        return resp.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error getting available integrations')
    }
};

export const installAvailableIntegration = async (id) => {
    try {
        const resp = await API.patch(`/available/integrations/${id}`);
        return resp.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error installing available integration')
    }
};

export const uninstallAvailableIntegration = async (id) => {
    try {
        const resp = await API.delete(`/available/integrations/${id}`);
        return resp.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error uninstalling available integration')
    }
};

export const getChannels = async (payload = {}) => {
    const params = { ...payload };
    try {
        const response = await API.get('/available/integrations/channels', { params });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error getting channels')
    }
};
