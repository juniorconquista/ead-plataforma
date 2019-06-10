import createLoadingPlugin from '@rematch/loading';
import createRematchPersist from '@rematch/persist';
import storageSession from 'redux-persist/lib/storage/session';

export const loading = createLoadingPlugin({
    whitelist: ['auth/login'],
});

export const persistPlugin = createRematchPersist({
    whitelist: ['auth'],
    storage: storageSession,
    version: 1,
});
