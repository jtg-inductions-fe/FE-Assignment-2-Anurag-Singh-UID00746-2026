import { ThemeType } from '@components/types';
import { alpha, InputBase, styled } from '@mui/material';

import { typography } from '@theme/foundations';

export const Search = styled('div')(({ theme }: ThemeType) => ({
    position: 'relative',
    border: `2px solid ${theme.palette.secondary.light}`,
    borderRadius: typography.typographyUtil.pxToRem(10),
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: alpha(theme.palette.secondary.light, 0.2),
    marginLeft: 0,
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
        borderColor: theme.palette.secondary.main,
    },

    [theme.breakpoints.up('sm')]: {
        maxWidth: typography.typographyUtil.pxToRem(700),
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }: ThemeType) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
}));

export const StyledInputBase = styled(InputBase)(({ theme }: ThemeType) => ({
    color: 'inherit',
    fontSize: typography.typographyUtil.pxToRem(15),
    width: '100%',

    '& input': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(5)})`,
        transition: theme.transitions.create('width'),
        width: '100%',

        [theme.breakpoints.up('sm')]: {
            width: typography.typographyUtil.pxToRem(200),
        },
    },
}));
