import * as repository from './repository';

export const settings = {
    state: {
        configuration: {},
    },
    reducers: {
        configuration(state, payload) {
            return {
                ...state,
                configuration: payload,
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: dispatch => ({
        async getConfigurationAsync() {
            try {
                const response = await repository.getConfiguration();
                return dispatch.settings.configuration(response.data);
            } catch (e) {
                throw e;
            }
        },
        async setConfigurationAsync(payload, getState) {
            try {
                const {
                    settings: {
                        configuration: { _id },
                    },
                } = getState;


                await repository.setConfiguration(_id, payload);
            } catch (e) {
                throw e;
            }
        },
        clearStores() {
            dispatch.configuration.clearStore();
        },
    }),
};
