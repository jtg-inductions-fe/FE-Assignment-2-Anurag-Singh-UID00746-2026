import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    addMenuItemThunk,
    addRestaurantThunk,
    deleteMenuItemThunk,
    deleteRestaurantThunk,
    fetchRestaurantsThunk,
    updateMenuItemThunk,
    updateRestaurantThunk,
} from './restaurantThunk';

import { RestaurantState } from './restaurant.types';
import { RestaurantResponse } from '../../types/restaurant.types';

const initialState: RestaurantState = {
    restaurants: [],
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        addRestaurant: (state, action: PayloadAction<RestaurantResponse>) => {
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
                state.error = null;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurantsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to fetch restaurants';
            })

            .addCase(addRestaurantThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRestaurantThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.restaurants = [action.payload, ...state.restaurants];
            })
            .addCase(addRestaurantThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to add restaurant';
            })

            .addCase(updateRestaurantThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRestaurantThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const index = state.restaurants.findIndex(
                    (restaurant) => restaurant.id === action.payload.id,
                );

                if (index !== -1) {
                    state.restaurants[index] = action.payload;
                }
            })
            .addCase(updateRestaurantThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to update restaurant';
            })

            .addCase(deleteRestaurantThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRestaurantThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                state.restaurants = state.restaurants.filter(
                    (restaurant) => restaurant.id !== action.payload,
                );
            })
            .addCase(deleteRestaurantThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to delete restaurant';
            })

            .addCase(addMenuItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(addMenuItemThunk.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const index = state.restaurants.findIndex(
            //         (restaurant) => restaurant.id === action.payload.id,
            //     );

            //     if (index !== -1) {
            //         state.restaurants[index] = action.payload;
            //     }
            // })
            .addCase(addMenuItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to add menu Item';
            })
            .addCase(updateMenuItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(updateMenuItemThunk.fulfilled, (state, action) => {
            //     const index = state.restaurants.findIndex(
            //         (restaurant) => restaurant.id === action.payload.id,
            //     );

            //     if (index !== -1) {
            //         state.restaurants[index] = action.payload;
            //     }
            // })
            .addCase(updateMenuItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ?? 'Failed to update menu Item';
            })
            .addCase(deleteMenuItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(deleteMenuItemThunk.fulfilled, (state, action) => {
            //     const index = state.restaurants.findIndex(
            //         (restaurant) => restaurant.id === action.payload.id,
            //     );

            //     if (index !== -1) {
            //         state.restaurants[index] = action.payload;
            //     }
            // })
            .addCase(deleteMenuItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ?? 'Failed to delete menu Item';
            });
    },
});

export const { addRestaurant, deleteRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
