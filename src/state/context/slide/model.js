import * as repository from './repository';
import handleErrors from '../../utils/handle-errors';

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
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        async sendSlideAsync(payload) {
            try {
                const bodyFormData = new FormData();
                bodyFormData.append('slide', payload.slide);
                await repository.sendSlide(bodyFormData);
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        async getSlideAsync() {
            try {
                const response = await repository.getSlide();
                return dispatch.slide.path(response.data);
            } catch (error) {
                handleErrors(error);
                throw new Error(error);
            }
        },
        clearStores() {
            dispatch.slide.clearStore();
        },
    }),
};
