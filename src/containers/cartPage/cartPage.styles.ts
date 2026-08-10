import { Box, Typography, Theme } from '@mui/material';
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

export const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2, 5),
    minHeight: '100dvh',

    [theme.breakpoints.up('tablet')]: {
        padding: theme.spacing(0),
    },
}));

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    margin: theme.spacing(5, 0),
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
}));

export const Main = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    margin: theme.spacing(12, 0, 8, 0),

    [theme.breakpoints.up('desktop')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.spacing(5),
    },
}));

export const CartSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    width: '100%',
    minWidth: 0,

    [theme.breakpoints.up('tablet')]: {
        flex: 1,
    },
}));

export const RestaurantCard = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.5),
    overflow: 'hidden',
}));

export const RestaurantHeader = styled(Box)(({ theme }) => ({
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

export const CartItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    padding: theme.spacing(5, 4),

    [theme.breakpoints.up('desktop')]: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto auto auto',
        alignItems: 'center',
        gap: theme.spacing(2),
    },
}));

export const Name = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    fontSize: typography.typographyUtil.pxToRem(15),
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    lineHeight: 1.4,
    marginBottom: theme.spacing(1),
    width: '100%',
    ...lineClamp(2),

    [theme.breakpoints.up('tablet')]: {
        fontSize: typography.typographyUtil.pxToRem(14),
        marginBottom: theme.spacing(1),
    },
}));

export const Description = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'block',
    marginLeft: typography.typographyUtil.pxToRem(3),
    width: '100%',
    overflow: 'hidden',
    maxWidth: '400px',
    marginTop: theme.spacing(0.5),

    '& .MuiTypography-root': {
        width: '100%',
        ...lineClamp(2),
    },

    [theme.breakpoints.up('tablet')]: {
        maxWidth: '100%',
    },
}));

export const ItemDetails = styled(Box)({
    minWidth: 0,
});

export const QuantityContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    gap: theme.spacing(6),
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.up('desktop')]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '220px',
        height: '36px',
        borderRadius: '8px',
        padding: '0 8px',
        flexShrink: 0,
    },
}));

export const ItemPrice = styled(Box)({
    flexShrink: 0,
});

export const DeleteContainer = styled(Box)({
    flexShrink: 0,
});

export const BillCard = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(4, 5),
    backgroundColor: alpha(theme.palette.secondary.light, 0.1),

    [theme.breakpoints.up('desktop')]: {
        width: 'min(32%, 35rem)',
        position: 'sticky',
        top: theme.spacing(2),
    },
}));

export const BillRowWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 0),
}));

export const BillRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    paddingBlock: theme.spacing(1),
    marginTop: typography.typographyUtil.pxToRem(12),
}));

export const ActionContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
}));
