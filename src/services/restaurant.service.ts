import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from '@features/restaurant/restaurant.types';
import { restaurants } from '@mock/restaurant';
import { Restaurant } from '../types/restaurant.types';

const cloneRestaurants = (): Restaurant[] =>
    restaurants.map((restaurant) => ({
        ...restaurant,
        menuItems: restaurant.menuItems.map((item) => ({ ...item })),
    }));

export const restaurantService = {
    fetchRestaurants: async (
        params: FetchRestaurantsParams,
    ): Promise<Restaurant[]> => {
        const { keyword } = params;

        const allRestaurants = cloneRestaurants();

        if (!keyword?.trim()) {
            return Promise.resolve(allRestaurants);
        }

        return Promise.resolve(
            allRestaurants.filter((restaurant) =>
                restaurant.name
                    .toLowerCase()
                    .includes(keyword.trim().toLowerCase()),
            ),
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

        if (index !== -1) {
            restaurants[index] = restaurant;
        }

        return restaurant;
    },

    addMenuItem: async ({
        restaurantId,
        menuItem,
    }: AddMenuItemParams): Promise<Restaurant> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const restaurant = restaurants.find((item) => item.id === restaurantId);

        if (!restaurant) {
            throw new Error('Restaurant not found');
        }

        restaurant.menuItems.unshift(menuItem);

        return {
            ...restaurant,
            menuItems: restaurant.menuItems.map((item) => ({ ...item })),
        };
    },

    updateMenuItem: async ({
        restaurantId,
        menuItem,
    }: UpdateMenuItemParams): Promise<Restaurant> => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const restaurant = restaurants.find((item) => item.id === restaurantId);

        if (!restaurant) {
            throw new Error('Restaurant not found');
        }

        const index = restaurant.menuItems.findIndex(
            (item) => item.id === menuItem.id,
        );

        if (index === -1) {
            throw new Error('Menu item not found');
        }

        restaurant.menuItems[index] = menuItem;

        return {
            ...restaurant,
            menuItems: restaurant.menuItems.map((item) => ({ ...item })),
        };
    },

    deleteMenuItem: async ({
        restaurantId,
        menuItemId,
    }: DeleteMenuItemParams): Promise<Restaurant> => {
        const restaurantIndex = restaurants.findIndex(
            (restaurant) => restaurant.id === restaurantId,
        );

        if (restaurantIndex === -1) {
            throw new Error('Restaurant not found');
        }

        const updatedRestaurant = {
            ...restaurants[restaurantIndex],
            menuItems: restaurants[restaurantIndex].menuItems.filter(
                (item) => item.id !== menuItemId,
            ),
        };

        restaurants[restaurantIndex] = updatedRestaurant;

        return {
            ...updatedRestaurant,
            menuItems: updatedRestaurant.menuItems.map((item) => ({
                ...item,
            })),
        };
    },
};
