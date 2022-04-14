/* eslint-disable no-undef */
import API, { getHeaders } from '../utils/api';

export const getConnectedIntegrations = async () => {
  const params = {
    limit: 25,
    offset: 0
  };
  try {
    const resp = await API.get('/integrations', { params });
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error getting available integrations')
  }
};

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

export const createIntegration = async (params) => {
  const { channel, name } = params;
  try {
    const response = await API.post('/integrations', {
      data: { name, channel }
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error creating integration')
  }
};

export const authorize = (id) => {
  const path = `integrations/${id}/authorize`;
  const redirectUri = `${process.env.REACT_APP_URL}/integrations/connected-integrations`;
  window.open(
    `${process.env.REACT_APP_ECAPI_URL}/${path}?redirect_uri=${redirectUri}&${getHeaders(
      path, `${process.env.REACT_APP_URL}/integrations/connected-integrations`
    )}`
  );
};

export const unauthorize = async (id) => {
  try {
    const response = await API.delete(`integrations/${id}/authorize`, {
      data: { data: { integration_id: id } }
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error unauthorizing integration')
  }
}

export const importResource = async (params) => {
  const { id, resource } = params;
  try {
    const response = await API.get(`/integrations/${id}/${resource}/import`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error importing resource from integration')
  }
}

