import { Box, IconButton, styled, Theme,Typography } from '@mui/material';

import { typography } from '@theme/foundations';

export const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    width: 120,
    borderRadius: 8,
    border: `1.5px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    padding: theme.spacing(0, 0.5),
}));

export const ActionButton = styled(IconButton)(
    ({ theme }: { theme: Theme }) => ({
        height: 36,
        width: 36,
        borderRadius: 6,
        color: theme.palette.text.secondary,
        transition: theme.transitions.create(['background-color', 'color']),

        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },

        '&:disabled': {
            color: theme.palette.action.disabled,
        },
    }),
);

export const QuantityDisplay = styled(Typography)(
    ({ theme }: { theme: Theme }) => ({
        minWidth: 40,
        textAlign: 'center',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: typography.typographyUtil.pxToRem(16),
        color: theme.palette.text.primary,
        userSelect: 'none',
    }),
);
