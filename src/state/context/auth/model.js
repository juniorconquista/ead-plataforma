import * as repository from './repository';

export const auth = {
    state: {},
    reducers: {
        login(state, payload) {
            return {
                ...state,
                ...payload,
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: dispatch => ({
        async loginAsync(payload) {
            try {
                const response = await repository.login(payload);
                sessionStorage.setItem(
                    'accessToken',
                    response.data.accessToken,
                );
                return dispatch.auth.login(response.data);
            } catch (e) {
                throw e;
            }
        },
        clearStores() {
            dispatch.auth.clearStore();
        },
    }),
};
