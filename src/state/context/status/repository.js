import apiClient from '../../utils/api-client';

export const getUsers = () => apiClient.get('/status');
export const setStatus = body => apiClient.post('/status', body);
export const deleteStatus = uuid => apiClient.delete(`/status/${uuid}`);
