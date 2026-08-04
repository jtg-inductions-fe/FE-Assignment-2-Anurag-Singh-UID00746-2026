import { Restaurant } from '../types/restaurant.types';

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
