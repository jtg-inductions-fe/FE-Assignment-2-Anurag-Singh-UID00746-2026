import { useEffect, useRef, useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import {
    Divider as MuiDivider,
    Typography as MuiTypography,
} from '@mui/material';

import MyButton from '@components/Button/Button.component';
import { useAppSelector } from '@store/hooks';

import {
    UserAvatar,
    UserIconButton,
    UserMenuItem,
    UserProfileBox,
    UserProfileMenu,
} from './UserProfile.styles';
import { USER_ROLE } from '@components/constants';

const UserProfile = ({ handleLogout }: { handleLogout: () => void }) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const logoutButtonRef = useRef<HTMLButtonElement | null>(null);
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
                    <MuiTypography variant="subtitle2">
                        {user?.fullName.toUpperCase() || USER_ROLE.GUEST}
                    </MuiTypography>
                </UserMenuItem>

                <UserMenuItem onClick={handleCloseUserMenu}>
                    <MuiTypography variant="body1" color="text.secondary">
                        {user?.email}
                    </MuiTypography>
                </UserMenuItem>
                <MuiDivider />
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
