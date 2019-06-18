import * as repository from './repository';
import handleErrors from '../../utils/handle-errors';

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
                sessionStorage.setItem('accessToken', response.data.uuid);
                return dispatch.auth.login({
                    ...response.data,
                    accessToken: response.data.uuid,
                });
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        async registerAsync(payload) {
            try {
                await repository.register(payload);
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        clearStores() {
            dispatch.auth.clearStore();
        },
    }),
};
