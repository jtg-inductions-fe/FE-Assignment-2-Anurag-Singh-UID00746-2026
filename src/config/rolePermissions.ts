import { UserRole } from '../types/user.types';
import { Permission } from './permissions';
import { USER_ROLE } from '@components/constants';

type PermissionKey = (typeof Permission)[keyof typeof Permission];

/** Role vs permissions mapping */
export const rolePermissions: Record<UserRole, PermissionKey[]> = {
    [USER_ROLE.GUEST]: [Permission.VIEW_LOGIN],
    [USER_ROLE.CUSTOMER]: [
        Permission.VIEW_CART,
        Permission.OPEN_RESTAURANT,
        Permission.ADD_TO_CART,
    ],
    [USER_ROLE.OWNER]: [
        Permission.ADD_RESTAURANT,
        Permission.OPEN_RESTAURANT,
        Permission.EDIT_RESTAURANT,
        Permission.DELETE_RESTAURANT,
        Permission.ADD_MENU_ITEM,
        Permission.EDIT_MENU_ITEM,
        Permission.DELETE_MENU_ITEM,
    ],
};
