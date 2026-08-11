import { Outlet } from 'react-router-dom';

import { Box as MuiBox } from '@mui/material';

import Header from '@containers/header/Header.container';
import Toast from '@containers/Toast/Toast.container';

const RootLayout = () => {
    return (
        <MuiBox>
            <Header />
            <Outlet />
            <Toast />
        </MuiBox>
    );
};

export default RootLayout;
