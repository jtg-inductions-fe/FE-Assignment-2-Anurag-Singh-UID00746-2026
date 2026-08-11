import { USER_ROLE } from '@components/constants';
import { Restaurant } from '../types/restaurant.types';
import { User } from '../types/user.types';

export const getVisibleRestaurants = (
    restaurants: Restaurant[],
    user: User | null,
) => {
    if (!user || user.role === USER_ROLE.CUSTOMER) {
        return restaurants;
    }

    return restaurants.filter((restaurant) => restaurant.ownerId === user.id);
};
