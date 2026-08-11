import { RootState } from '@store/index';

/**
 * Finds and returns all orders made by a specific customer.
 */
export const selectCustomerOrders = (state: RootState, customerId: string) => {
    state.order.orders.filter((order) => order.customerId === customerId);
};

/**
 * Finds and returns all orders belonging to a specific restaurant.
 */
export const selectRestaurantOrders = (
    state: RootState,
    restaurantId: string,
) => {
    state.order.orders.filter((order) => order.restaurantId === restaurantId);
};
