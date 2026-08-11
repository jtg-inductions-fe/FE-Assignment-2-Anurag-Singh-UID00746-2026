import { Outlet } from 'react-router-dom';

import { Box as MuiBox } from '@mui/material';

import Header from '@containers/header/Header.container';
import Toast from '@containers/Toast/Toast.container';

const RootLayout = () => {
    return (
        <MuiBox
            margin="0 auto"
            maxWidth={{ xs: '100%', sm: '90%', md: '1440px' }}
            padding={{ md: 4 }}
        >
            <Header />
            <Outlet />
            <Toast />
        </MuiBox>
    );
};

export default RootLayout;
