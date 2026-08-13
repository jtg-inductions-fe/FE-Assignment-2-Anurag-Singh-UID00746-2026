import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    AddMenuItemParams,
    DeleteMenuItemParams,
    FetchRestaurantsParams,
    UpdateMenuItemParams,
} from './restaurant.types';
import { restaurantService } from '@services/restaurant.service';
import { Restaurant } from '../../types/restaurant.types';

export const fetchRestaurantsThunk = createAsyncThunk(
    'restaurant/fetchRestaurants',
    async (params: FetchRestaurantsParams) => {
        const restaurants = await restaurantService.fetchRestaurants(params);

        return restaurants;
    },
);

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
