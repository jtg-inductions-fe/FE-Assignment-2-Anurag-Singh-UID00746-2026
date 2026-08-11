import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Restaurant } from '../../types/restaurant.types';

import {
    addRestaurantThunk,
    fetchRestaurantsThunk,
    updateRestaurantThunk,
} from './restaurantThunk';

type RestaurantState = {
    restaurants: Restaurant[];
    loading: boolean;
    error: string | null;
};

const initialState: RestaurantState = {
    restaurants: [],
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants = [action.payload, ...state.restaurants];
        },

        deleteRestaurant: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (restaurant) => restaurant.id !== action.payload,
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurantsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurantsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Something went wrong';
            })
            .addCase(addRestaurantThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRestaurantThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = [action.payload, ...state.restaurants];
            })
            .addCase(addRestaurantThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ?? 'Failed to add restaurant';
            })
            .addCase(updateRestaurantThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRestaurantThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = state.restaurants.map((restaurant) =>
                    restaurant.id === action.payload.id
                        ? action.payload
                        : restaurant,
                );
            })
            .addCase(updateRestaurantThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ?? 'Failed to update restaurant';
            });
    },
});

export const { addRestaurant, deleteRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
