const isProduction = window.location.hostname === 'tool-for-ead-support.herokuapp.com';

export const BASE_URL = isProduction
    ? 'https://tool-for-ead-support-api.herokuapp.com'
    : 'http://localhost:9000';


export const uuidv4 = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r && 0x3) || 0x8;
        return v.toString(16);
    });
