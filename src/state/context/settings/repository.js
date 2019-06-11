import apiClient from '../../utils/api-client';

export const getConfiguration = () => apiClient.get('/configuration');
export const setConfiguration = (_id, body) =>
    apiClient.put(`/configuration/${_id}`, body);
