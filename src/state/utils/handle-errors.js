import { toast } from 'react-toastify';

export default error => {
    if (error && error.response && error.response.data.message) {
        toast.error(error.response.data.message);
    } else {
        toast.error(
            'Ocorreu um erro, favor contatar o administrador caso o problema persista.',
        );
    }
};
