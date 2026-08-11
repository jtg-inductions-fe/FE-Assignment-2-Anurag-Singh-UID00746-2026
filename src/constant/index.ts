export { COLORS, HTML_FONT_SIZE, SCALING_FACTOR } from './themeConstant';

/** Diet classification values for filtering or tagging food items. */
export const FOOD_CATEGORY = {
    VEG: 'veg',
    NON_VEG: 'non-veg',
    BOTH: 'both',
} as const;

/** Complete list of weekly days paired with their standard system identifiers. */
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

/** Standard baseline work week identifiers used for default selection scheduling. */
export const DEFAULT_DAYS = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
];

export type FoodCategory = (typeof FOOD_CATEGORY)[keyof typeof FOOD_CATEGORY];
