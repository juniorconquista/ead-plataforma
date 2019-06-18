import io from 'socket.io-client';

let sockets = {};
const findOrCreate = (baseUrl, path) => {
    let socket = sockets[path];
    if (!socket) {
        socket = connect(
            baseUrl,
            path,
        );
    } else if (socket.disconnected) {
        // wait for a long period  to avoid duplicated connections.
        setTimeout(
            () =>
                socket.disconnected &&
                connect(
                    baseUrl,
                    path,
                ),
            5000,
        );
    }

    return socket;
};

const close = name => {
    const socket = sockets[name];
    if (socket) {
        const socket = sockets[name];
        socket.disconnect();
        socket.close();
    }
    delete sockets[name];
};

const closeAll = () => {
    Object.keys(sockets).forEach(close);
    sockets = {};
};

const connect = (baseUrl, path) => {
    const socket = io.connect(baseUrl, {
        path,
        reconnection: true,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 50000,
        reconnectionAttempts: 5,
    });
    sockets[path] = socket;
    return socket;
};

export { findOrCreate, close, closeAll };
