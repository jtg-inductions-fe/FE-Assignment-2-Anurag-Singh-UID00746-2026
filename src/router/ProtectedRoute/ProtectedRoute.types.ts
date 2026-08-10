import { ReactNode } from 'react';

import { UserRole } from '../../types/user.types';

export type ProtectedRouteProps = {
    children: ReactNode;
    allowedRoles: UserRole[];
};
