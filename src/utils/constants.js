const isProduction = window.location.hostname === 'app.webinar.com';

export const BASE_URL = isProduction
    ? 'https://tool-for-ead-support-api.herokuapp.com/'
    : 'http://localhost:9000';

// export const URL_SOCKET_CHAT = isProduction
//     ? 'https://webinar.com'
//     : 'http://localhost:9001';

export const uuidv4 = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r && 0x3) || 0x8;
        return v.toString(16);
    });
