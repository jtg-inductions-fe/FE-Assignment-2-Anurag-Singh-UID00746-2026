export { COLORS, HTML_FONT_SIZE, SCALING_FACTOR } from './theme';

export const FOOD_CATEGORY = {
    VEG: 'veg',
    NON_VEG: 'non-veg',
    BOTH: 'both',
} as const;

export const DAYS = [
    {
        label: 'Monday',
        value: 'MONDAY',
    },
    {
        label: 'Tuesday',
        value: 'TUESDAY',
    },
    {
        label: 'Wednesday',
        value: 'WEDNESDAY',
    },
    {
        label: 'Thursday',
        value: 'THURSDAY',
    },
    {
        label: 'Friday',
        value: 'FRIDAY',
    },
    {
        label: 'Saturday',
        value: 'SATURDAY',
    },
    {
        label: 'Sunday',
        value: 'SUNDAY',
    },
];

export const DEFAULT_DAYS = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
];

export type FoodCategory = (typeof FOOD_CATEGORY)[keyof typeof FOOD_CATEGORY];
