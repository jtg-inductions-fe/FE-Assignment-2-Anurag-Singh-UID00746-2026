import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cart.types';

type CartState = {
    items: CartItem[];
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (item) => item.id === action.payload.id,
            );

            if (existing) {
                existing.quantity += action.payload.quantity;
                return;
            }

            state.items.push(action.payload);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const incItem = state.items.find(
                (item) => item.id === action.payload,
            );

            if (!incItem) return;

            incItem.quantity += 1;
        },

        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const decItem = state.items.find(
                (item) => item.id === action.payload,
            );

            if (!decItem) return;

            if (decItem.quantity === 1) {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );

                return;
            }

            decItem.quantity -= 1;
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
