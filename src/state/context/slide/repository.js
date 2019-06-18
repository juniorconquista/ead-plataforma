import apiClient from '../../utils/api-client';

export const getFiles = path =>
    apiClient.get(`/files?path=${path}`, { responseType: 'blob' });

export const getSlide = () => apiClient.get('/slide');

export const sendSlide = formData => apiClient.post('/slide/upload', formData);
