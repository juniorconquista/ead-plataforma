import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@rematch/core';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';

import { loading, persistPlugin } from './utils/config-state';
import models from './state';

import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const store = init({
    models,
    plugins: [persistPlugin, loading],
});

const persistor = getPersistor();

const App = () => (
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
        <ToastContainer
            position="top-right"
            autoClose={7000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
    </PersistGate>
);

export default memo(App);
