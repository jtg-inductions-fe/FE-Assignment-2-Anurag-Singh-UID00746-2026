import { RestaurantResponse } from '../types/restaurant.types';

const WEEK_DAYS = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
] as const;

export const isOpenToday = (restaurant: RestaurantResponse): boolean => {
    const now = new Date();

    const currentDay = now
        .toLocaleString('en-US', {
            weekday: 'long',
        })
        .toUpperCase();

    const currentDayIndex = WEEK_DAYS.indexOf(
        currentDay as (typeof WEEK_DAYS)[number],
    );

    const yesterdayIndex =
        (currentDayIndex - 1 + WEEK_DAYS.length) % WEEK_DAYS.length;

    const currentDayName = WEEK_DAYS[currentDayIndex];
    const yesterdayName = WEEK_DAYS[yesterdayIndex];

    const currentTime = now.toTimeString().slice(0, 5);

    const openingTime = restaurant.opening_time.slice(0, 5);
    const closingTime = restaurant.closing_time.slice(0, 5);

    const isOvernight = openingTime > closingTime;

    if (!isOvernight) {
        return (
            restaurant.working_days.includes(currentDayName) &&
            openingTime <= currentTime &&
            currentTime <= closingTime
        );
    }

    const openedToday = restaurant.working_days.includes(currentDayName);

    if (openedToday && currentTime >= openingTime) {
        return true;
    }

    const openedYesterday = restaurant.working_days.includes(yesterdayName);

    if (openedYesterday && currentTime <= closingTime) {
        return true;
    }

    return false;
};
