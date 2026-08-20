import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import { useAppSelector } from '@store/hooks';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to={ROUTES.AUTH.LOGIN} replace />
    );
};

export default ProtectedRoute;
