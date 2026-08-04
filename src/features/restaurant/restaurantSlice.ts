import { restaurants } from '@mock/restaurant';
import { Restaurant } from '../../types/restaurant.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurants: Restaurant[];
}

const initialState: RestaurantState = {
    restaurants,
};

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        addRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurants.push(action.payload);
        },

        deleteRestaurant: (state, action: PayloadAction<string>) => {
            state.restaurants = state.restaurants.filter(
                (restaurant) => restaurant.id !== action.payload,
            );
        },
    },
});

export const { addRestaurant, deleteRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
