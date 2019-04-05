import * as repository from './repository';

export const chat = {
    state: {
        messages: [],
        countUsers: 1,
    },
    reducers: {
        messages(state, payload) {
            return {
                ...state,
                messages: [...state.messages, ...payload],
            };
        },
        count(state, payload) {
            return {
                ...state,
                countUsers: payload,
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: dispatch => ({
        async getMessagesAsync(payload) {
            try {
                const response = await repository.getMessages(payload);
                return dispatch.chat.messages(response.data);
            } catch (e) {
                throw e;
            }
        },
        async sendMessageAsync(payload) {
            try {
                await repository.sendMessage(payload);
            } catch (e) {
                throw e;
            }
        },
        clearStores() {
            dispatch.chat.clearStore();
        },
    }),
};
