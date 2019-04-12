import apiClient from '../../utils/api-client';

export const getMessages = () => apiClient.get('/chat/list');
export const sendMessage = body => apiClient.post('/chat/send-message', body);
export const statusMessage = (id, status) =>
    apiClient.put(`/chat/status-message/${id}`, { status });
