import { Container, styled, Typography, TypographyProps } from '@mui/material';

export const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '95dvh',
    width: '100%',
});

export const ClickableLink = styled(Typography)<
    TypographyProps & {
        component?: React.ElementType;
        to?: string;
        href?: string;
    }
>(({ theme }) => ({
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
