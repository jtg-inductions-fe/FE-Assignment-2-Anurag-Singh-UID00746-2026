import { USER_ROLE } from '@components/constants';
import { UserRole } from '@types';

/** permissions of the users */
export const permission = {
    VIEW_LOGIN: 'VIEW_LOGIN',
    VIEW_CART: 'VIEW_CART',
    ADD_RESTAURANT: 'ADD_RESTAURANT',
    OPEN_RESTAURANT: 'OPEN_RESTAURANT',
    EDIT_RESTAURANT: 'EDIT_RESTAURANT',
    DELETE_RESTAURANT: 'DELETE_RESTAURANT',
    ADD_TO_CART: 'ADD_TO_CART',
    ADD_MENU_ITEM: 'ADD_MENU_ITEM',
    EDIT_MENU_ITEM: 'EDIT_MENU_ITEM',
    DELETE_MENU_ITEM: 'DELETE_MENU_ITEM',
    MANAGE_ORDERS: 'MANAGE_ORDERS',
} as const;

type permissionKey = (typeof permission)[keyof typeof permission];

/** Role vs permissions mapping */
export const rolepermissions: Record<UserRole, permissionKey[]> = {
    [USER_ROLE.GUEST]: [permission.VIEW_LOGIN],
    [USER_ROLE.CUSTOMER]: [
        permission.VIEW_CART,
        permission.OPEN_RESTAURANT,
        permission.ADD_TO_CART,
    ],
    [USER_ROLE.OWNER]: [
        permission.ADD_RESTAURANT,
        permission.OPEN_RESTAURANT,
        permission.EDIT_RESTAURANT,
        permission.DELETE_RESTAURANT,
        permission.ADD_MENU_ITEM,
        permission.EDIT_MENU_ITEM,
        permission.DELETE_MENU_ITEM,
        permission.MANAGE_ORDERS,
    ],
};
