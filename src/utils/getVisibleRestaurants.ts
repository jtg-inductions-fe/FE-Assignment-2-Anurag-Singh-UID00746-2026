import { Restaurant } from '@types';
import { USER_ROLE } from '../types/user.types';
import { User } from '@types';

export const getVisibleRestaurants = (
    restaurants: Restaurant[],
    user: User | null,
) => {
    if (!user || user.role === USER_ROLE.CUSTOMER) {
        return restaurants;
    }

    return restaurants.filter((restaurant) => restaurant.ownerId === user.id);
};
