import { ThemeType } from '@components/types';
import { Link, styled } from '@mui/material';

export const StyledLink = styled(Link)(({ theme }: ThemeType) => ({
    cursor: 'pointer',
    display: 'inline',
    textDecoration: 'none',
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.pxToRem(15),

    '&:hover': {
        color: theme.palette.secondary.main,
    },

    '&:focus-visible': {
        outline: `2px solid ${theme.palette.secondary.main}`,
        outlineOffset: '2px',
    },
}));
