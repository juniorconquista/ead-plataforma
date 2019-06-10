import axios from 'axios';
import { toast } from 'react-toastify';
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
    error => {
        if (error && error.response && error.response.data.message) {
            toast.error(error.response.data.message);
        }
        return Promise.reject(error);
    },
);

export default instance;
