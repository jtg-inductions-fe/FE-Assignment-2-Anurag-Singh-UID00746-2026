import { Order, OrderStatus } from '../types/order.types';

export const orderService = {
    createOrder: async (order: Order): Promise<Order> => {
        await new Promise((res) => setTimeout(res, 2000));
        return order;
    },

    updateOrderStatus: async (
        order: Order,
        status: OrderStatus,
    ): Promise<Order> => {
        return {
            ...order,
            status,
        };
    },
};
