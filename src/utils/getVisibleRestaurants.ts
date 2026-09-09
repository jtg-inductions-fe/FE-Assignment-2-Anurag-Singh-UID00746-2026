import { USER_ROLE } from '@components/constants';
import { User } from '@types';
import { RestaurantResponse } from '../types/restaurant.types';

/**
 * Filters and returns the restaurants that the current user is allowed to see.
 * Customers see all restaurants, while owners only see their own restaurants.
 * @param restaurants - The list of all restaurants in the system.
 * @param user - The currently logged-in user profile, or null if logged out.
 * @returns An array of filtered restaurants visible to the user.
 */
export const getVisibleRestaurants = (
    restaurants: RestaurantResponse[],
    user: User | null,
) => {
    if (!user || user.role === USER_ROLE.CUSTOMER) {
        return restaurants;
    }

    return restaurants.filter((restaurant) => restaurant.owner_id === user.id);
};
