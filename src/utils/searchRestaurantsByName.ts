import { Restaurant } from '@types';

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
