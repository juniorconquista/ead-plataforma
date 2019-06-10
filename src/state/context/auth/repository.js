import apiClient from '../../utils/api-client';

export const login = body => apiClient.post('/user/login', body);
export const register = body => apiClient.post('/user/create', body);
