import { Permission } from './permissions';
import { USER_ROLE, UserRole } from '../types/user.types';

type PermissionKey = (typeof Permission)[keyof typeof Permission];

export const rolePermissions: Record<UserRole, PermissionKey[]> = {
    [USER_ROLE.GUEST]: [Permission.VIEW_LOGIN],
    [USER_ROLE.CUSTOMER]: [Permission.VIEW_CART, Permission.OPEN_RESTAURANT],
    [USER_ROLE.OWNER]: [
        Permission.ADD_RESTAURANT,
        Permission.OPEN_RESTAURANT,
        Permission.EDIT_RESTAURANT,
        Permission.DELETE_RESTAURANT,
    ],
};
