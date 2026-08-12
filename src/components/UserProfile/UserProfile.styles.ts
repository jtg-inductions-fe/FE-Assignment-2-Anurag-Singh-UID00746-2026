import { ThemeType } from '@components/types';
import { Avatar, Box, Menu, MenuItem, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const UserProfileBox = styled(Box)(() => ({
    flexGrow: 0,
}));

export const UserProfileMenu = styled(Menu)(({ theme }: ThemeType) => ({
    marginTop: typography.typographyUtil.pxToRem(45),

    '& .MuiMenu-paper': {
        boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)',
        backgroundColor: theme.palette.common.white,
    },
}));

export const UserIconButton = styled(Avatar)(() => ({
    height: typography.typographyUtil.pxToRem(46),
    width: typography.typographyUtil.pxToRem(46),

    boxShadow:
        'inset 0px -4px 0px rgba(0, 0, 0, 0.2), 0px 4px 10px rgba(0, 0, 0, 0.15)',
}));

export const UserAvatar = styled(Avatar)(({ theme }: ThemeType) => ({
    transition: 'all 0.4s ease-in-out',
    cursor: 'pointer',
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '100%',
    textAlign: 'center',

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },
}));

export const UserMenuItem = styled(MenuItem)(({ theme }: ThemeType) => ({
    minHeight: 0,
    padding: theme.spacing(0, 4, 1, 4),
    gap: typography.typographyUtil.pxToRem(4),
    justifyContent: 'start',
}));
