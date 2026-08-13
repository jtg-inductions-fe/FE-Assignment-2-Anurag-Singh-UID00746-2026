import { Order, OrderStatus } from '@types';

export const orderService = {
    /**
     * Creates a new order for the customer
     * @param order: order of the customer
     * @returns order after the delay of 2 secs
     */
    createOrder: async (order: Order): Promise<Order> => {
        await new Promise((res) => setTimeout(res, 2000));
        return order;
    },

    /**
     * Updates the status of an existing order
     * @param order: order of the customer
     * @param status: status of the order
     * @returns updated order with new status
     */
    updateOrderStatus: async (
        order: Order,
        status: OrderStatus,
        reason?: string,
    ): Promise<Order> => {
        return {
            ...order,
            status,
            rejectionReason:
                status === 'Rejected'
                    ? reason?.trim() || 'Order rejected by the restaurant.'
                    : null,
        };
    },
};
