import createLoadingPlugin from '@rematch/loading';
import createRematchPersist from '@rematch/persist';
import storageSession from 'redux-persist/lib/storage/session';

export const loading = createLoadingPlugin({
    whitelist: [
        'auth/loginAsync',
        'auth/registerAsync',
        'settings/setConfigurationAsync',
        'slide/sendSlideAsync',
        'status/getUsersAsync'
    ],
});

export const persistPlugin = createRematchPersist({
    whitelist: ['auth'],
    storage: storageSession,
    version: 1,
});
