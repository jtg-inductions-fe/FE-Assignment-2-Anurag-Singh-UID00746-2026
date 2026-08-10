import { MenuItem } from '@types';

export type FetchRestaurantsParams = {
    keyword?: string;
};

export interface AddMenuItemParams {
    restaurantId: string;
    menuItem: MenuItem;
}

export interface UpdateMenuItemParams {
    restaurantId: string;
    menuItem: MenuItem;
}

export interface DeleteMenuItemParams {
    restaurantId: string;
    menuItemId: string;
}
