import { Container, styled, Typography, TypographyProps } from '@mui/material';

import { typography } from '../../theme/foundations';

export const CenteredContainer = styled(Container)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '90dvh',
});

export const ClickableLink = styled(Typography)<
    TypographyProps<'a', { href?: string }>
>(({ theme }) => ({
    cursor: 'pointer',
    display: 'inline',
    textDecoration: 'none',
    marginLeft: typography.typographyUtil.pxToRem(8),

    '&:hover': {
        color: theme.palette.secondary.main,
    },

    '&:focus-visible': {
        outline: `2px solid ${theme.palette.secondary.main}`,
        outlineOffset: '2px',
    },
}));
