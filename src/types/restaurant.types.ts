import { MenuItem } from './menuItem.types';

export type Restaurant = {
    id: string;
    ownerId: string;

    name: string;
    description: string;
    image: string;

    address: string;

    isVeg: boolean;
    isOpenToday: boolean;

    operatingDays: {
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
        saturday: boolean;
        sunday: boolean;
    };

    openingTime: string;
    closingTime: string;

    menuItems: MenuItem[];
};
