import { createSlice } from '@reduxjs/toolkit';
import { createOrderThunk, updateOrderStatusThunk } from './orderThunk';
import { OrderState } from './order.types';

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.unshift(action.payload);
            })

            .addCase(createOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to create order';
            })

            .addCase(updateOrderStatusThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.orders.findIndex(
                    (order) => order.id === action.payload.id,
                );

                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })

            .addCase(updateOrderStatusThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to update order status';
            });
    },
});

export default orderSlice.reducer;
