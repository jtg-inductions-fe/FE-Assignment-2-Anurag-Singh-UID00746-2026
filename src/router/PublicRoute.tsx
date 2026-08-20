import { useAppSelector } from '@store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes';

export default function PublicRoute() {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    if (isLoggedIn) {
        return <Navigate to={ROUTES.ROOT} replace />;
    }

    return <Outlet />;
}
