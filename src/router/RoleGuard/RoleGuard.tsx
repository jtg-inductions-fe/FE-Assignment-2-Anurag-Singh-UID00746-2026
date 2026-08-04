import { useAppSelector } from '@store/hooks';
import { RoleGuardProps } from './RoleGuard.types';
import { USER_ROLE } from '../../types/user.types';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@router/routes';

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
    const { user, isLoggedIn } = useAppSelector((state) => state.auth);

    if (!isLoggedIn || !allowedRoles.includes(user?.role || USER_ROLE.GUEST)) {
        return <Navigate to={ROUTES.ROOT} replace />;
    }

    return <Outlet />;
};

export default RoleGuard;
