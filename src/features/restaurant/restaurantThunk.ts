import { createAsyncThunk } from '@reduxjs/toolkit';
import { restaurantService } from '@services/restaurant.service';

import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from './restaurant.types';
import { Restaurant } from '@types';

/**
 * Gets a list of restaurants from the backend using optional search filters.
 */
export const fetchRestaurantsThunk = createAsyncThunk(
    'restaurant/fetchRestaurants',
    async (params: FetchRestaurantsParams) => {
        const restaurants = await restaurantService.fetchRestaurants(params);

        return restaurants;
    },
);

/**
 * Sends a request to the backend to create a new restaurant profile.
 */
export const addRestaurantThunk = createAsyncThunk<
    Restaurant,
    Restaurant,
    { rejectValue: string }
>(
    'restaurant/addRestaurant',
    async (restaurant: Restaurant, { rejectWithValue }) => {
        try {
            return await restaurantService.addRestaurant(restaurant);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

/**
 * Sends a request to the backend to update an existing restaurant profile.
 */
export const updateRestaurantThunk = createAsyncThunk<
    Restaurant,
    Restaurant,
    { rejectValue: string }
>(
    'restaurant/updateRestaurant',
    async (restaurant: Restaurant, { rejectWithValue }) => {
        try {
            return await restaurantService.updateRestaurant(restaurant);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    },
);

/**
 * Adds a new food item to a restaurant menu list in the database.
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
