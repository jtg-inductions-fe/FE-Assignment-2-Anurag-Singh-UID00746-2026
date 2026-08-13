import { ThemeType } from '@components/types';
import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { typography } from '@theme/foundations';
import { CSSProperties } from 'react';

const lineClamp = (lines: number = 1): CSSProperties => ({
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lines,
});

export const Container = styled(Box)(({ theme }: ThemeType) => ({
    width: '100%',
    padding: theme.spacing(2, 5),
    minHeight: '100dvh',

    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0),
    },
}));

export const Header = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    margin: theme.spacing(5, 0),
}));

export const HeaderContent = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
}));

export const Wrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    margin: theme.spacing(12, 0, 8, 0),

    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.spacing(5),
    },
}));

export const CartSection = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    width: '100%',
    minWidth: 0,

    [theme.breakpoints.up('sm')]: {
        flex: 1,
    },
}));

export const RestaurantCard = styled(Box)(({ theme }: ThemeType) => ({
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
}));

export const RestaurantHeader = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: theme.spacing(2, 4),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.primary.light, 0.4),
}));

export const RestaurantItems = styled(Box)({
    width: '100%',
});

export const CartItem = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    padding: theme.spacing(5, 4),

    [theme.breakpoints.up('lg')]: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto auto auto',
        alignItems: 'center',
        gap: theme.spacing(2),
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
        fontSize: typography.typographyUtil.pxToRem(14),
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

export const ItemDetails = styled(Box)({
    minWidth: 0,
});

export const QuantityContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    gap: theme.spacing(6),
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.up('lg')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: typography.typographyUtil.pxToRem(220),
        height: typography.typographyUtil.pxToRem(36),
        borderRadius: typography.typographyUtil.pxToRem(8),
        padding: theme.spacing(0, 8),
        flexShrink: 0,
    },
}));

export const ItemPrice = styled(Box)({
    flexShrink: 0,
});

export const DeleteContainer = styled(Box)({
    flexShrink: 0,
});

export const ActionContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
}));
