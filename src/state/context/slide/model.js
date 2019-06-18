import * as repository from './repository';

export const slide = {
    state: {
        path: '',
        file: '',
    },
    reducers: {
        path(state, payload) {
            return {
                ...state,
                ...payload,
            };
        },
        file(state, payload) {
            return {
                ...state,
                file: payload,
            };
        },
        clearStore() {
            return {};
        },
    },
    effects: dispatch => ({
        async getFilesAsync(payload) {
            try {
                const response = await repository.getFiles(payload);
                return dispatch.slide.file(URL.createObjectURL(response.data));
            } catch (e) {
                console.log(e);

                throw e;
            }
        },
        async getSlideAsync() {
            try {
                const response = await repository.getSlide();
                return dispatch.slide.path(response.data);
            } catch (e) {
                throw e;
            }
        },
        clearStores() {
            dispatch.slide.clearStore();
        },
    }),
};
