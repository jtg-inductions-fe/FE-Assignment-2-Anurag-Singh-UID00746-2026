import { useState } from 'react';

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
    const { user } = useAppSelector((state) => state.auth);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <UserProfileBox>
            <UserIconButton onClick={handleOpenUserMenu}>
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
                        variant="text"
                        color="error"
                        disableRipple
                        startIcon={<LogoutIcon color="error" />}
                        onClick={handleLogout}
                    >
                        Logout
                    </MyButton>
                </UserMenuItem>
            </UserProfileMenu>
        </UserProfileBox>
    );
};

export default UserProfile;
