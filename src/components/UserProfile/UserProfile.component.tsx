import { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
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

import { deleteUser } from '@features/auth/authThunk';
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

    const handleDeleteProfile = async () => {
        try {
            await dispatch(deleteUser()).unwrap();

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Profile deleted successfully !!',
                }),
            );

            handleCloseUserMenu();

            navigate(ROUTES_SEGMENTS.AUTH.LOGIN);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Profile Deletion Failed',
                    message: error as string,
                }),
            );
        }
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

                    <IconButton color="error" onClick={handleDeleteProfile}>
                        <DeleteIcon />
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
