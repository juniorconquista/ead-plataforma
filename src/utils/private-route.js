export const validateRoutePermission = (path, state) => {
    const {
        auth: { isAdmin },
    } = state;

    switch (true) {
        case path.includes('/admin'):
            if (isAdmin) {
                return true;
            }
            return false;
        default:
            return true;
    }
};
