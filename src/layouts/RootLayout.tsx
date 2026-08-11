import { Outlet } from 'react-router-dom';

import { Box as MuiBox } from '@mui/material';

import Header from '@containers/header/Header.container';
import Toast from '@containers/Toast/Toast.container';
import { theme } from '@theme/index';

const RootLayout = () => {
    return (
        <MuiBox
            margin="0 auto"
            maxWidth={{ xs: '100%', sm: '90%', md: '1440px' }}
            padding={{ md: theme.spacing(4, 15) }}
        >
            <Header />
            <Outlet />
            <Toast />
        </MuiBox>
    );
};

export default RootLayout;
