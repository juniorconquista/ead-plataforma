import apiClient from '../../utils/api-client';

export const getConfiguration = () => apiClient.get('/configuration');
