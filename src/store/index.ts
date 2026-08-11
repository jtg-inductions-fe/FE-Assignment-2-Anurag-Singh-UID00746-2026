import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '@features/auth/authSlice';
import feedbackReducer from '@features/feedback/feedbackSlice';
import toastReducer from '@features/toast/toastSlice';
import restaurantReducer from '@features/restaurant/restaurantSlice';

import { configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        toast: toastReducer,
        feedback: feedbackReducer,
        restaurant: restaurantReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    PERSIST,
                    REHYDRATE,
                    PAUSE,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
