import API from '../utils/api';

export const getTasks = async ({ page, rowsPerPage }) => {
  const params = {
    limit: rowsPerPage,
    offset: Number(page * rowsPerPage)
  };
  try {
    const resp = await API.get('/tasks', { params });
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error getting tasks')
  }
};

export const retryTask = async (id) => {
  try {
    const resp = await API.put(`/tasks/${id}/retry`);
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error retrying task')
  }
};

export const getTask = async (id) => {
  try {
    const resp = await API.get(`/tasks/${id}`);
    return resp.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error getting task')
  }
};
