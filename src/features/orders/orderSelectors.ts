import { RootState } from '@store/index';

export const selectCustomerOrders = (state: RootState, customerId: string) => {
    state.order.orders.filter((order) => order.customerId === customerId);
};

export const selectRestaurantOrders = (
    state: RootState,
    restaurantId: string,
) => {
    state.order.orders.filter((order) => order.restaurantId === restaurantId);
};
