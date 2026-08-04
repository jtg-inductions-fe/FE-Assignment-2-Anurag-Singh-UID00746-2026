import { Restaurant } from '../types/restaurant.types';

export const isOpenToday = (restaurant: Restaurant) => {
    const today = new Date()
        .toLocaleDateString('en-US', {
            weekday: 'long',
        })
        .toLowerCase() as keyof Restaurant['operatingDays'];

    return restaurant.operatingDays[today];
};
