import { UserRole } from '../../types/user.types';
import { ReactNode } from 'react';

export type ProtectedRouteProps = {
    children: ReactNode;
    allowedRoles: UserRole[];
};
