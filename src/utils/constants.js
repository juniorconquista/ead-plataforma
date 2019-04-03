const isProduction = window.location.hostname === 'app.orange.com';

export const BASE_URL = isProduction
    ? 'https://orange.com'
    : 'http://localhost:3001';
