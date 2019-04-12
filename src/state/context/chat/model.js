import * as repository from './repository';

export const chat = {
    state: {
        messages: [],
        messagesWaiting: [],
        countUsers: 1,
    },
    reducers: {
        messages(state, payload) {
            return {
                ...state,
                messages: payload,
            };
        },
        messagesUpdate(state, payload) {
            return {
                ...state,
                messages: [...state.messages, ...payload],
            };
        },
        messagesWaiting(state, payload) {
            return {
                ...state,
                messagesWaiting: payload,
            };
        },
        messagesWaitingReceived(state, payload) {
            return {
                ...state,
                messagesWaiting: [...state.messagesWaiting, ...payload],
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
        async getMessagesAsync() {
            try {
                const response = await repository.getMessages();
                const messagesWaiting = response.data.filter(
                    message =>
                        message.status !== 'rejected' &&
                        message.status !== 'approved',
                );
                dispatch.chat.messagesWaiting(messagesWaiting);
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
        async statusMessageAsync(data, getState) {
            try {
                console.log(data);

                const { id, status } = data;
                await repository.statusMessage(id, status);
                const {
                    chat: { messagesWaiting },
                } = getState;
                const newMessages = messagesWaiting.filter(
                    message => message._id !== id,
                );
                dispatch.chat.messagesWaiting(newMessages);
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        clearStores() {
            dispatch.chat.clearStore();
        },
    }),
};
