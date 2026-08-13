import { UserRole } from '@types';

/** Props for the RoleGuard component used to conditionally show elements. */
export type RoleGuardProps = {
    /** A list of user roles that are allowed to see the guarded content. */
    allowedRoles: UserRole[];
};
