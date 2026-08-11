import { FOOD_CATEGORY } from '@constant';

/** List of available food category card configurations for display cards. */
export const CATEGORY_CARD = [
    {
        value: FOOD_CATEGORY.VEG,
        title: 'Veg',
        subtitle: 'Pure vegetarian food',
        image: ' ',
    },

    {
        value: FOOD_CATEGORY.NON_VEG,
        title: 'Non Veg',
        subtitle: 'Serves non vegetarian food',
        image: ' ',
    },

    {
        value: FOOD_CATEGORY.BOTH,
        title: 'Both',
        subtitle: 'Serves both veg and non veg food',
        image: ' ',
    },
];
