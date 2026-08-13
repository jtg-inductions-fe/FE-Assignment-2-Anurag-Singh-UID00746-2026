import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from '@features/restaurant/restaurant.types';
import { restaurants } from '@mock/restaurant';

import { Restaurant } from '@types';

const cloneRestaurants = (): Restaurant[] =>
    restaurants.map((restaurant) => ({
        ...restaurant,
        menuItems: restaurant.menuItems.map((item) => ({ ...item })),
    }));

export const restaurantService = {
    /**
     * Filters the restaurant based on the keyword searched by the user
     * @param params: restaurant name from the URL
     * @returns filtered list of restaurants based on the keyword
     */
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

    /**
     * Adds a new restaurant to the existing restaurants array
     * @param restaurant: restaurant added by the owner
     * @returns the newly added restaurant
     */
    addRestaurant: async (restaurant: Restaurant): Promise<Restaurant> => {
        await new Promise((res) => setTimeout(res, 2000));

        restaurants.unshift(restaurant);

        return restaurant;
    },

    /**
     * Updates an existing restaurant in the restaurants array
     * @param restaurant: updated restaurant information
     * @returns the updated restaurant
     */
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

    /**
     * Adds a new menu item to an existing restaurant
     * @param restaurantId: id of the restaurant to which the menu item is added
     * @param menuItem: menu item added by the owner
     * @returns the updated restaurant with the newly added menu item
     */
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

    /**
     * Updates an existing menu item in an existing restaurant
     * @param restaurantId: id of the restaurant to which the menu item belongs
     * @param menuItem: updated menu item information
     * @returns the updated restaurant with the modified menu item
     */
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

    /**
     * Deletes a menu item from an existing restaurant
     * @param restaurantId: id of the restaurant from which the menu item is deleted
     * @param menuItemId: id of the menu item to be deleted
     * @returns the updated restaurant with the deleted menu item
     */
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
