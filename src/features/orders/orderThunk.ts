import { createAsyncThunk } from '@reduxjs/toolkit';

import { Order, OrderStatus } from '@types';
import { orderService } from '@services/order.service';

export const createOrderThunk = createAsyncThunk<
    Order,
    Order,
    { rejectValue: string }
>('order/createOrder', async (order, { rejectWithValue }) => {
    try {
        return await orderService.createOrder(order);
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to create order',
        );
    }
});

export const updateOrderStatusThunk = createAsyncThunk<
    Order,
    {
        order: Order;
        status: OrderStatus;
        reason?: string;
    },
    { rejectValue: string }
>(
    'order/updateOrderStatus',
    async ({ order, status, reason }, { rejectWithValue }) => {
        try {
            return await orderService.updateOrderStatus(order, status, reason);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to update order status',
            );
        }
    },
);
