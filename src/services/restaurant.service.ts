import { FetchRestaurantsParams } from '@features/restaurant/restaurant.types';
import { restaurants } from '@mock/restaurant';
import { Restaurant } from '../types/restaurant.types';

export const restaurantService = {
    fetchRestaurants: async (
        params: FetchRestaurantsParams,
    ): Promise<Restaurant[]> => {
        const { keyword } = params;

        if (!keyword?.trim()) {
            return Promise.resolve([...restaurants]);
        }

        return Promise.resolve(
            restaurants
                .filter((restaurant) =>
                    restaurant.name
                        .toLowerCase()
                        .includes(keyword.trim().toLowerCase()),
                )
                .map((restaurant) => ({ ...restaurant })),
        );
    },

    addRestaurant: async (restaurant: Restaurant): Promise<Restaurant> => {
        await new Promise((res) => setTimeout(res, 2000));

        restaurants.unshift(restaurant);

        return restaurant;
    },

    updateRestaurant: async (restaurant: Restaurant): Promise<Restaurant> => {
        await new Promise((res) => setTimeout(res, 2000));

        const index = restaurants.findIndex(
            (item) => item.id === restaurant.id,
        );

        if (index === -1) {
            throw new Error(`Restaurant "${restaurant.id}" was not found`);
        }

        restaurants[index] = restaurant;

        return restaurant;
    },
};
