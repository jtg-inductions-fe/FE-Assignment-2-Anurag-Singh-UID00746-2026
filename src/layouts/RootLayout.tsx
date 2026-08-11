import { Outlet } from 'react-router-dom';

import { Box as MuiBox } from '@mui/material';

import Header from '@containers/header/Header.container';
import Toast from '@containers/Toast/Toast.container';

const RootLayout = () => {
    return (
        <MuiBox
            margin="0 auto"
            maxWidth={{ mobile: '100%', tablet: '90%', desktop: '1440px' }}
            padding={{ desktop: 4 }}
        >
            <Header />
            <Outlet />
            <Toast />
        </MuiBox>
    );
};

export default RootLayout;
