import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
    Restaurant,
    RestaurantRequest,
    RestaurantUpdateRequest,
} from '@api/types/restaurant.types';

import { restaurantService } from '@services/restaurant.service';

import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from './restaurant.types';

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
    if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (typeof detail === 'string') {
            return detail;
        }

        if (Array.isArray(detail)) {
            const validationMessage = detail
                .map((item) => item?.msg)
                .filter(Boolean)
                .join(', ');

            if (validationMessage) {
                return validationMessage;
            }
        }
    }

    return fallbackMessage;
};

/**
 * Gets a list of restaurants from the backend using pagination,
 * search, and restaurant type filters.
 */
export const fetchRestaurantsThunk = createAsyncThunk<
    Restaurant[],
    FetchRestaurantsParams,
    { rejectValue: string }
>('restaurant/fetchRestaurants', async (params, { rejectWithValue }) => {
    try {
        return await restaurantService.fetchRestaurants(params);
    } catch (error) {
        return rejectWithValue(
            getErrorMessage(error, 'Failed to fetch restaurants'),
        );
    }
});

/**
 * Sends a request to the backend to create a new restaurant profile.
 */
export const addRestaurantThunk = createAsyncThunk<
    Restaurant,
    RestaurantRequest,
    { rejectValue: string }
>('restaurant/addRestaurant', async (restaurant, { rejectWithValue }) => {
    try {
        return await restaurantService.addRestaurant(restaurant);
    } catch (error) {
        return rejectWithValue(
            getErrorMessage(error, 'Failed to add restaurant'),
        );
    }
});

/**
 * Sends a request to the backend to update an existing restaurant profile.
 */
export const updateRestaurantThunk = createAsyncThunk<
    Restaurant,
    {
        restaurantId: string;
        data: RestaurantUpdateRequest;
    },
    { rejectValue: string }
>(
    'restaurant/updateRestaurant',
    async ({ restaurantId, data }, { rejectWithValue }) => {
        try {
            return await restaurantService.updateRestaurant(restaurantId, data);
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error, 'Failed to update restaurant'),
            );
        }
    },
);

/**
 * Sends a request to the backend to delete an existing restaurant profile.
 */
export const deleteRestaurantThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>('restaurant/deleteRestaurant', async (restaurantId, { rejectWithValue }) => {
    try {
        await restaurantService.deleteRestaurant(restaurantId);

        return restaurantId;
    } catch (error) {
        return rejectWithValue(
            getErrorMessage(error, 'Failed to delete restaurant'),
        );
    }
});

/**
 * Adds a new menu item to a restaurant menu list in the database.
 */
export const addMenuItemThunk = createAsyncThunk(
    'restaurant/addMenuItem',
    async (params: AddMenuItemParams, { rejectWithValue }) => {
        try {
            return await restaurantService.addMenuItem(params);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

/**
 * Updates the details of an existing food item on a restaurant menu.
 */
export const updateMenuItemThunk = createAsyncThunk(
    'restaurant/updateMenuItem',
    async (params: UpdateMenuItemParams, { rejectWithValue }) => {
        try {
            return await restaurantService.updateMenuItem(params);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

/**
 * Removes a food item from a restaurant menu profile.
 */
export const deleteMenuItemThunk = createAsyncThunk(
    'restaurant/deleteMenuItem',
    async (params: DeleteMenuItemParams, { rejectWithValue }) => {
        try {
            return await restaurantService.deleteMenuItem(params);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
