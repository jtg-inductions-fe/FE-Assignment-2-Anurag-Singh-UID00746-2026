import { ReactNode } from 'react';

import { UserRole } from '@types';

/** Props for the ProtectedRoute component to restrict page access. */
export type ProtectedRouteProps = {
    /** The pages or components inside this route wrapper that need security protection. */
    children: ReactNode;

    /** A list of user roles that are allowed to see this page. */
    allowedRoles: UserRole[];
};
