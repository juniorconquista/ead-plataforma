import apiClient from '../../utils/api-client';

export const login = body => apiClient.post('/user/login', body);
