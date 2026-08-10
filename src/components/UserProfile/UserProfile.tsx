import { useEffect, useRef, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Typography } from '@mui/material';

import MyButton from '@components/Button/Button';
import { useAppSelector } from '@store/hooks';

import {
    UserAvatar,
    UserIconButton,
    UserMenuItem,
    UserProfileBox,
    UserProfileMenu,
} from './UserProfile.styles';
import { USER_ROLE } from '../../types/user.types';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const UserProfile = ({
    handleLogout,
    handleOrders,
}: {
    handleLogout: () => void;
    handleOrders: () => void;
}) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const logoutButtonRef = useRef<HTMLButtonElement | null>(null);
    const ordersButtonRef = useRef<HTMLButtonElement | null>(null);
    const { user } = useAppSelector((state) => state.auth);

    const handleOpenUserMenu = (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    useEffect(() => {
        if (anchorElUser) {
            requestAnimationFrame(() => {
                logoutButtonRef.current?.focus();
            });
        }
    }, [anchorElUser]);

    const handleUserMenuKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
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
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleLogout();
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
                <UserAvatar alt={user?.fullName} src="null" />
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
                    <Typography variant="subtitle2">
                        {user?.fullName.toUpperCase() || USER_ROLE.GUEST}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user?.email}
                    </Typography>
                </UserMenuItem>

                <UserMenuItem onClick={handleCloseUserMenu}></UserMenuItem>
                <Divider />
                <UserMenuItem onClick={handleCloseUserMenu}>
                    <MyButton
                        ref={ordersButtonRef}
                        variant="text"
                        color="common.black"
                        disableRipple
                        onClick={handleOrders}
                        startIcon={<LocalMallOutlinedIcon color="primary" />}
                        onKeyDown={handleLogoutKeyDown}
                    >
                        MY ORDERS
                    </MyButton>
                </UserMenuItem>
                <Divider />
                <UserMenuItem onClick={handleCloseUserMenu}>
                    <MyButton
                        ref={logoutButtonRef}
                        variant="text"
                        color="error"
                        disableRipple
                        startIcon={<LogoutIcon color="error" />}
                        onClick={handleLogout}
                        onKeyDown={handleLogoutKeyDown}
                    >
                        Logout
                    </MyButton>
                </UserMenuItem>
            </UserProfileMenu>
        </UserProfileBox>
    );
};

export default UserProfile;
