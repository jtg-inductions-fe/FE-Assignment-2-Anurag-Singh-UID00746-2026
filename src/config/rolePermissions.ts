import { UserRole } from '../types/user.types';
import { Permission } from './permissions';
import { USER_ROLE } from '@components/constants';

type PermissionKey = (typeof Permission)[keyof typeof Permission];

/** Role vs permissions mapping */
export const rolePermissions: Record<UserRole, PermissionKey[]> = {
    [USER_ROLE.GUEST]: [Permission.VIEW_LOGIN],
    [USER_ROLE.CUSTOMER]: [Permission.VIEW_CART],
    [USER_ROLE.OWNER]: [Permission.ADD_RESTAURANT],
};
