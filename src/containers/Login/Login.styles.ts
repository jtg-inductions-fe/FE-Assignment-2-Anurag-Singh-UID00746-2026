import { ThemeType } from '@components/types';
import { Container, styled, Typography, TypographyProps } from '@mui/material';
import { typography } from '@theme/foundations';

export const CenteredContainer = styled(Container)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '85dvh',
    paddingInline: typography.typographyUtil.pxToRem(10),

    [theme.breakpoints.up('sm')]: {
        padding: 0,
    },
}));

export const LoginForm = styled('form')({
    width: '100%',
    maxWidth: typography.typographyUtil.pxToRem(500),
    paddingInline: typography.typographyUtil.pxToRem(7),
});

export const ClickableLink = styled(Typography)<
    TypographyProps & {
        component?: React.ElementType;
        to?: string;
        href?: string;
    }
>(({ theme }: ThemeType) => ({
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
