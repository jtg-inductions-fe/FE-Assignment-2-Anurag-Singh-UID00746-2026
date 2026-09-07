import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { getCurrentUser } from './features/auth/authThunk';
import { router } from './router';
import { persistor, store } from './store';
import { theme } from './theme';

const AuthInitializer = () => {
    useEffect(() => {
        store.dispatch(getCurrentUser());
    }, []);

    return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthInitializer />
                </PersistGate>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
