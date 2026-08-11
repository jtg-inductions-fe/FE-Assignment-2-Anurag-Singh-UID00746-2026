import { Restaurant } from '@types';

/**
 * Checks the current day of the week to see if the restaurant is open today.
 * @param restaurant - The restaurant data object containing operating days.
 * @returns True if the restaurant is open today, false otherwise.
 */
export const isOpenToday = (restaurant: Restaurant) => {
    const today = new Date()
        .toLocaleDateString('en-US', {
            weekday: 'long',
        })
        .toLowerCase() as keyof Restaurant['operatingDays'];

    return restaurant.operatingDays[today];
};
