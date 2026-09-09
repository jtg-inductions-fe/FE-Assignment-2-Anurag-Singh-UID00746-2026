import {
    PaginationRequest,
    PaginationResponse,
    Restaurant,
    RestaurantRequest,
    RestaurantUpdateRequest,
} from '@api/types/restaurant.types';
import apiClient from './client';

export const createRestaurant = async (
    data: RestaurantRequest,
): Promise<void> => {
    await apiClient.post<void>('/restaurants/create', data);
};

export const getRestaurants = async (
    params?: PaginationRequest,
): Promise<PaginationResponse<Restaurant>> => {
    const response = await apiClient.get<PaginationResponse<Restaurant>>(
        '/restaurants',
        {
            params,
        },
    );

    return response.data;
};

export const getRestaurantById = async (
    restaurantId: string,
): Promise<Restaurant> => {
    const response = await apiClient.get<Restaurant>(
        `/restaurants/${restaurantId}`,
    );

    return response.data;
};

export const updateRestaurant = async (
    restaurantId: string,
    data: RestaurantUpdateRequest,
): Promise<void> => {
    await apiClient.patch<void>(`/restaurants/${restaurantId}`, data);
};

export const deleteRestaurant = async (restaurantId: string): Promise<void> => {
    await apiClient.delete<void>(`/restaurants/${restaurantId}`);
};
