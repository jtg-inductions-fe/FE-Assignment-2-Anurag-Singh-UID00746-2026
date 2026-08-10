import { RootState } from '@store/index';

import { CartItem } from './cart.types';

export const selectCartItemCount = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

export const selectCartItemsByRestaurant = (state: RootState) => state.cart.items.reduce(
        (groups, item) => {
            if (!groups[item.restaurantId]) {
                groups[item.restaurantId] = [];
            }

            groups[item.restaurantId].push(item);

            return groups;
        },
        {} as Record<string, CartItem[]>,
    );
