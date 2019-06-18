import * as repository from './repository';
import handleErrors from '../../utils/handle-errors';

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
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
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
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        clearStores() {
            dispatch.configuration.clearStore();
        },
    }),
};
