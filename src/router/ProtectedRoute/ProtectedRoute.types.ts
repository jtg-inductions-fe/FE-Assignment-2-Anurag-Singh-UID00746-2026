import { ReactNode } from 'react';

import { UserRole } from '@types';

export type ProtectedRouteProps = {
    children: ReactNode;
    allowedRoles: UserRole[];
};
