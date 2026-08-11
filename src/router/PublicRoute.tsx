import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@store/hooks';

import { ROUTES } from './routes';

const PublicRoute = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    return isLoggedIn ? <Navigate to={ROUTES.ROOT} replace /> : <Outlet />;
};

export default PublicRoute;
