import { ThemeType } from '@components/types';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const Container = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: typography.typographyUtil.pxToRem(44),
    width: typography.typographyUtil.pxToRem(120),
    borderRadius: typography.typographyUtil.pxToRem(8),
    border: `1.5px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
    padding: theme.spacing(0, 0.5),
}));

export const ActionButton = styled(IconButton)(({ theme }: ThemeType) => ({
    height: typography.typographyUtil.pxToRem(36),
    width: typography.typographyUtil.pxToRem(36),
    borderRadius: typography.typographyUtil.pxToRem(6),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create(['background-color', 'color']),

    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },

    '&:disabled': {
        color: theme.palette.action.disabled,
    },
}));

export const QuantityDisplay = styled(Typography)(({ theme }: ThemeType) => ({
    minWidth: typography.typographyUtil.pxToRem(40),
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: typography.typographyUtil.pxToRem(16),
    color: theme.palette.text.primary,
    userSelect: 'none',
}));
