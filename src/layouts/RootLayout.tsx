import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import Toast from '@components/Toast/Toast';
import Header from '@containers/header/Header';
import { hideToast } from '@features/toast/toastSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

const RootLayout = () => {
    const dispatch = useAppDispatch();

    const { open, type, title, message } = useAppSelector(
        (state) => state.toast,
    );

    return (
        <Box>
            <Header />
            <Outlet />
            <Toast
                open={open}
                type={type}
                title={title}
                message={message}
                onClose={() => dispatch(hideToast())}
            />
        </Box>
    );
};

export default RootLayout;
