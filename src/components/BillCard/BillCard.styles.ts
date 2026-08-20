import { ThemeType } from '@components/types';
import { alpha, Box, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const BillCardWrapper = styled(Box)(({ theme }: ThemeType) => ({
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(4, 5),
    backgroundColor: alpha(theme.palette.secondary.light, 0.1),

    [theme.breakpoints.up('lg')]: {
        width: 'min(32%, 35rem)',
        position: 'sticky',
        top: theme.spacing(2),
    },
}));

export const BillRowWrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2, 0),
}));

export const BillRow = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    paddingBlock: theme.spacing(1),
    marginTop: typography.typographyUtil.pxToRem(12),
}));
