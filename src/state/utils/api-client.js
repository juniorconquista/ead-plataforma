import axios from 'axios';
import { BASE_URL } from '../../utils/constants';

const instance = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    config => {
        config.url = `${BASE_URL}${config.url}`;
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.accessToken = accessToken;
        }
        return config;
    },
    error => Promise.reject(error),
);

instance.interceptors.response.use(
    response => response,
    error => Promise.reject(error),
);

export default instance;
