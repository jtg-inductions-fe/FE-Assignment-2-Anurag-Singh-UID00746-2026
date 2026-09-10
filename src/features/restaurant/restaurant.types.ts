import { MenuItem, Restaurant } from '@types';
import { RestaurantResponse } from '../../types/restaurant.types';

/**
 * Parameters used to search for or filter restaurants.
 */
export interface FetchRestaurantsParams {
    /**
     * The search keyword used to find specific restaurants.
     */
    keyword?: string;

    /**
     * Maximum number of restaurants to fetch.
     */
    limit?: number;

    /**
     * Cursor used for cursor-based pagination.
     */
    cursor?: string;

    /**
     * Restaurant type used to filter restaurants.
     */
    restaurantType?: 'VEG' | 'NON_VEG';
}

/**
 * Parameters needed to add a new food item to a restaurant menu.
 */
export interface AddMenuItemParams {
    /**
     * The unique ID of the target restaurant.
     */
    restaurantId: string;

    /**
     * The full food item data object to create.
     */
    menuItem: MenuItem;
}

/**
 * Parameters needed to update an existing food item on a menu.
 */
export interface UpdateMenuItemParams {
    /**
     * The unique ID of the target restaurant.
     */
    restaurantId: string;

    /**
     * The modified food item data object to save.
     */
    menuItem: MenuItem;
}

/**
 * Parameters needed to remove a food item from a menu.
 */
export interface DeleteMenuItemParams {
    /**
     * The unique ID of the target restaurant.
     */
    restaurantId: string;

    /**
     * The unique ID of the food item to delete.
     */
    menuItemId: string;
}

export type RestaurantState = {
    /**
     * The list of all restaurants.
     */
    restaurants: RestaurantResponse[];

    /**
     * True if the app is loading the restaurants.
     */
    loading: boolean;

    /**
     * A text message explaining what went wrong.
     * This is null if there are no errors.
     */
    error: string | null;
};
