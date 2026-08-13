import { Restaurant } from '@types';

/**
 * Filters a list of restaurants to find matches for a given search text word.
 * @param restaurants - The list of all restaurants to filter through.
 * @param searchTerm - The typed-out search keyword text from the user.
 * @returns A filtered list of matching restaurants, or all restaurants if search is empty.
 */
export const searchRestaurantsByName = (
    restaurants: Restaurant[],
    searchTerm: string,
) => {
    if (!searchTerm.trim()) {
        return restaurants;
    }

    return restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );
};
