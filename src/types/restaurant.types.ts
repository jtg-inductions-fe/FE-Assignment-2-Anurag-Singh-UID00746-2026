import { FoodCategory } from '@constant';

import { MenuItem } from './menuItem.types';

/** All information describing a restaurant profile. */
export type Restaurant = {
    /** The unique ID of the restaurant. */
    id: string;

    /** The ID of the owner who manages this restaurant. */
    ownerId: string;

    /** The display name of the restaurant. */
    name: string;

    /** A short text describing the kitchen or style of the restaurant. */
    description: string;

    /** The image URL link for the restaurant banner photo. */
    image: string;

    /** The physical street address location of the store. */
    address: string;

    /** The optional contact phone number for customer queries. */
    contactNumber?: string;

    /** The classification tag for food served. */
    category: FoodCategory;

    /** True if the restaurant is active and accepting orders right now. */
    isOpenToday: boolean;

    /** Weekly timetable toggles showing which specific days the store opens. */
    operatingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };

    /** Daily opening milestone timestamp string. */
    openingTime: string;

    /** Daily closing milestone timestamp string. */
    closingTime: string;

    /** The complete list of available food items sold on their active menu. */
    menuItems: MenuItem[];
};
