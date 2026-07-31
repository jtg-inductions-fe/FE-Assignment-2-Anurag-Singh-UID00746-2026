import { Permission } from './permissions';
import { USER_ROLE, UserRole } from '../types/user.types';

type PermissionKey = (typeof Permission)[keyof typeof Permission];

export const rolePermissions: Record<UserRole, PermissionKey[]> = {
    [USER_ROLE.GUEST]: [Permission.VIEW_LOGIN],
    [USER_ROLE.CUSTOMER]: [Permission.VIEW_CART],
    [USER_ROLE.OWNER]: [Permission.ADD_RESTAURANT],
};
