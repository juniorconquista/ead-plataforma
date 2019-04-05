const isProduction = window.location.hostname === 'app.webinar.com';

export const BASE_URL = isProduction
    ? 'https://webinar.com'
    : 'http://localhost:9000';

export const URL_SOCKET_CHAT = isProduction
    ? 'https://webinar.com'
    : 'http://localhost:9001';
