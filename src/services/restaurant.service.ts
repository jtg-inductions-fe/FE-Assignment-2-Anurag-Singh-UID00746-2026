import {
    createRestaurant,
    deleteRestaurant as deleteRestaurantApi,
    getRestaurants,
    updateRestaurant as updateRestaurantApi,
} from '@api/restaurant.api';
import {
    RestaurantRequest,
    RestaurantUpdateRequest,
} from '@api/types/restaurant.types';
import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from '@features/restaurant/restaurant.types';

import { Restaurant, RestaurantResponse } from '../types/restaurant.types';
import { restaurants } from '@mock/restaurant';

export const restaurantService = {
    /**
     * Filters the restaurant based on the keyword searched by the user
     * @param params: restaurant name from the URL
     * @returns filtered list of restaurants based on the keyword
     */
    fetchRestaurants: async (
        params: FetchRestaurantsParams,
    ): Promise<RestaurantResponse[]> => {
        const response = await getRestaurants({
            limit: params.limit,
            cursor: params.cursor,
            q: params.keyword,
            type: params.restaurantType,
        });

        return response.items;
    },

    /**
     * Creates a new restaurant through the backend API.
     * @param restaurant: restaurant data provided by the owner
     * @returns the created restaurant
     */
    addRestaurant: async (
        restaurant: RestaurantRequest,
    ): Promise<RestaurantResponse> => {
        await createRestaurant(restaurant);

        const response = await getRestaurants({
            limit: 1,
        });

        const createdRestaurant = response.items[0];

        if (!createdRestaurant) {
            throw new Error('Failed to fetch created restaurant');
        }

        return createdRestaurant;
    },

    /**
     * Updates an existing restaurant through the backend API.
     * @param restaurantId: id of the restaurant to update
     * @param data: updated restaurant information
     * @returns the updated restaurant
     */
    updateRestaurant: async (
        restaurantId: string,
        data: RestaurantUpdateRequest,
    ): Promise<RestaurantResponse> => {
        await updateRestaurantApi(restaurantId, data);

        const response = await getRestaurants({
            limit: 100,
        });

        const updatedRestaurant = response.items.find(
            (item) => item.id === restaurantId,
        );

        if (!updatedRestaurant) {
            throw new Error(`Restaurant "${restaurantId}" was not found`);
        }

        return updatedRestaurant;
    },

    /**
     * Deletes an existing restaurant through the backend API.
     * @param restaurantId: id of the restaurant to delete
     * @returns nothing after successful deletion
     */
    deleteRestaurant: async (restaurantId: string): Promise<void> => {
        await deleteRestaurantApi(restaurantId);
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
        const restaurantIndex = restaurants.findIndex(
            (item) => item.id === restaurantId,
        );

        if (restaurantIndex === -1) {
            throw new Error('Restaurant not found');
        }

        const updatedRestaurant = {
            ...restaurants[restaurantIndex],
            menuItems: [menuItem, ...restaurants[restaurantIndex].menuItems],
        };

        restaurants[restaurantIndex] = updatedRestaurant;

        return updatedRestaurant;
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
        const restaurantIndex = restaurants.findIndex(
            (item) => item.id === restaurantId,
        );

        if (restaurantIndex === -1) {
            throw new Error('Restaurant not found');
        }

        const updatedRestaurant = {
            ...restaurants[restaurantIndex],
            menuItems: restaurants[restaurantIndex].menuItems.map((item) =>
                item.id === menuItem.id ? menuItem : item,
            ),
        };

        restaurants[restaurantIndex] = updatedRestaurant;

        return updatedRestaurant;
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
