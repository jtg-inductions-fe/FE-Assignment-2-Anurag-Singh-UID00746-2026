import { ThemeType } from '@components/types';
import { Z_INDEX } from '@constant/theme';
import { Box, Card, IconButton, styled, Typography } from '@mui/material';
import { typography } from '@theme/foundations';
import { CSSProperties } from 'react';

const lineClamp = (lines: number = 1): CSSProperties => ({
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
});

export const StyledCard = styled(Card)(({ theme }: ThemeType) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: typography.typographyUtil.pxToRem(16),
    cursor: 'pointer',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: theme.spacing(2),
    },
}));

export const Content = styled(Box)(({ theme }: ThemeType) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(5, 3),
    gap: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 4),
        gap: theme.spacing(4),
    },
}));

export const MetaContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(3),
    },
}));

export const Name = styled(Typography)(({ theme }: ThemeType) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: typography.typographyUtil.pxToRem(15),
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    lineHeight: 1.4,
    marginBottom: theme.spacing(1),
    width: '100%',
    ...lineClamp(2),

    [theme.breakpoints.up('sm')]: {
        fontSize: typography.typographyUtil.pxToRem(18),
        marginBottom: theme.spacing(1),
    },
}));

export const Description = styled(Box)(({ theme }: ThemeType) => ({
    display: 'block',
    marginLeft: typography.typographyUtil.pxToRem(3),
    width: '100%',
    overflow: 'hidden',
    maxWidth: typography.typographyUtil.pxToRem(400),
    marginTop: theme.spacing(0.5),

    '& .MuiTypography-root': {
        width: '100%',
        ...lineClamp(2),
    },

    [theme.breakpoints.up('sm')]: {
        maxWidth: '100%',
    },
}));

export const Footer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        marginTop: 'auto',
    },
}));

export const OwnerActions = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    gap: theme.spacing(2),
    zIndex: Z_INDEX,
}));

export const ActionIcon = styled(IconButton)(({ theme }: ThemeType) => ({
    height: typography.typographyUtil.pxToRem(38),
    width: typography.typographyUtil.pxToRem(38),
    borderRadius: typography.typographyUtil.pxToRem(10),
    color: theme.palette.text.secondary,
    padding: 0,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow:
        '0 2px 4px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
    transition: theme.transitions.create(
        [
            'background-color',
            'color',
            'border-color',
            'transform',
            'box-shadow',
        ],
        {
            duration: 200,
            easing: theme.transitions.easing.easeInOut,
        },
    ),

    '&:hover': {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.light,
        backgroundColor: 'rgba(25, 118, 210, 0.04)',
        transform: 'translateY(-1px)',
    },

    '&:active': {
        transform: 'translateY(0) scale(0.95)',
    },
}));

export const ActionWrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    gap: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(4),
    },
}));
