import { RootState } from '@store/index';

import { CartItem } from './cart.types';

/**
 * Counts the total number of all items added to the cart.
 */
export const selectCartItemCount = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

/**
 * Calculates the total cost of all items currently in the cart.
 */
export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

/**
 * Separates and groups cart items by their restaurant ID.
 */
export const selectCartItemsByRestaurant = (state: RootState) =>
    state.cart.items.reduce(
        (groups, item) => {
            if (!groups[item.restaurantId]) {
                groups[item.restaurantId] = [];
            }

            groups[item.restaurantId].push(item);

            return groups;
        },
        {} as Record<string, CartItem[]>,
    );
