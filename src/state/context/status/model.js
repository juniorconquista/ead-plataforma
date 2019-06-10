import moment from 'moment';
import * as repository from './repository';

export const status = {
    state: {
        users: [],
    },
    reducers: {
        users(state, payload) {
            return {
                ...state,
                users: payload,
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: dispatch => ({
        async getUsersAsync() {
            try {
                const response = await repository.getUsers();
                const list = response.data.filter(
                    f => moment().diff(moment(f.date), 'minutes') <= 1,
                );
                return dispatch.status.users(list);
            } catch (e) {
                throw e;
            }
        },
        async setStatusAsync(payload) {
            try {
                await repository.setStatus(payload);
            } catch (e) {
                throw e;
            }
        },
        async deleteStatusAsync(payload) {
            try {
                await repository.deleteStatus(payload);
            } catch (e) {
                throw e;
            }
        },
        clearStores() {
            dispatch.chat.clearStore();
        },
    }),
};
