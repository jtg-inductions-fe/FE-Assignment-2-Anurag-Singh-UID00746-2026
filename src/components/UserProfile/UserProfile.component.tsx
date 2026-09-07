import { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import {
    IconButton,
    Divider as MuiDivider,
    Typography as MuiTypography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@store/hooks';

import {
    UserAvatar,
    UserIconButton,
    UserMenuItem,
    UserProfileBox,
    UserProfileMenu,
} from './UserProfile.styles';

import { USER_ROLE, TOAST_TYPES } from '@components/constants';
import { Button } from '@components/Button';
import { UserProfileProps } from './UserProfile.types';

import { showToast } from '@features/toast/toastSlice';
import { ROUTES_SEGMENTS } from '@router/routes';

export const UserProfile = (props: UserProfileProps) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { user } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpenUserMenu = (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleUserMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleOpenUserMenu(event);
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogoutKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.handleLogout();
        }
    };

    const handleOrdersKeyDown = (
        event: React.KeyboardEvent<HTMLButtonElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.handleOrders();
        }
    };

    const handleUpdateProfile = async () => {
        navigate(ROUTES_SEGMENTS.USER.PROFILE_UPDATE);

        handleCloseUserMenu();
    };

    const handleAddresses = () => {
        navigate(ROUTES_SEGMENTS.ADDRESS.VIEW_ADDRESSES);
    };

    return (
        <UserProfileBox>
            <UserIconButton
                tabIndex={0}
                role="button"
                aria-label="Open user menu"
                onClick={handleOpenUserMenu}
                onKeyDown={handleUserMenuKeyDown}
            >
                <UserAvatar alt={user?.name?.toUpperCase()} src="null" />
            </UserIconButton>

            <UserProfileMenu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <UserMenuItem onClick={handleCloseUserMenu}>
                    <MuiTypography variant="subtitle2">
                        {user?.name?.toUpperCase() || USER_ROLE.GUEST}
                    </MuiTypography>

                    <IconButton color="error" onClick={handleUpdateProfile}>
                        <EditIcon color="primary" />
                    </IconButton>
                </UserMenuItem>

                <UserMenuItem onClick={handleCloseUserMenu}>
                    <MuiTypography variant="body1" color="text.secondary">
                        {user?.email}
                    </MuiTypography>
                </UserMenuItem>

                <MuiDivider />

                <UserMenuItem onClick={props.handleOrders}>
                    <Button
                        variant="text"
                        color="primary"
                        disableRipple
                        onClick={props.handleOrders}
                        startIcon={<LocalMallOutlinedIcon color="primary" />}
                        onKeyDown={handleOrdersKeyDown}
                    >
                        MY ORDERS
                    </Button>
                </UserMenuItem>

                <MuiDivider />

                <UserMenuItem onClick={handleAddresses}>
                    <Button
                        variant="text"
                        sx={{ color: 'black' }}
                        disableRipple
                        onClick={handleAddresses}
                    >
                        MY ADDRESSES
                    </Button>
                </UserMenuItem>

                <MuiDivider />

                <UserMenuItem onClick={props.handleLogout}>
                    <Button
                        variant="text"
                        color="error"
                        disableRipple
                        startIcon={<LogoutIcon color="error" />}
                        onClick={props.handleLogout}
                        onKeyDown={handleLogoutKeyDown}
                    >
                        Logout
                    </Button>
                </UserMenuItem>
            </UserProfileMenu>
        </UserProfileBox>
    );
};
