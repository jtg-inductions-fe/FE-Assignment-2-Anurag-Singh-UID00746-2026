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
import cartReducer from '@features/cart/cartSlice';
import ordersReducer from '@features/orders/orderSlice';
import feedbackReducer from '@features/feedback/feedbackSlice';
import restaurantReducer from '@features/restaurant/restaurantSlice';
import toastReducer from '@features/toast/toastSlice';
import { configureStore } from '@reduxjs/toolkit';
import addressReducer from '@features/address/addressSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const cartPersistConfig = {
    key: 'cart',
    storage,
};

const ordersPersistConfig = {
    key: 'orders',
    storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrdersReducer = persistReducer(
    ordersPersistConfig,
    ordersReducer,
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        address: addressReducer,
        toast: toastReducer,
        feedback: feedbackReducer,
        restaurant: restaurantReducer,
        cart: persistedCartReducer,
        order: persistedOrdersReducer,
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
