import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@store/hooks';
import { ROUTES } from '@router/routes';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.AUTH.LOGIN} replace />
    );
};

export default ProtectedRoute;
