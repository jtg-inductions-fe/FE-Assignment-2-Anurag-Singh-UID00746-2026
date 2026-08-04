import { Box, Stack, styled, Theme } from '@mui/material';

import { typography } from '@theme/foundations';

export const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    padding: theme.spacing(4, 5),
    borderBottom: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.up('tablet')]: {
        padding: theme.spacing(4, 0),
        borderBottom: 'none',
    },
}));

export const Container = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateAreas: `
    "logo right"
    "search search"
  `,
    rowGap: theme.spacing(3),
    alignItems: 'center',

    [theme.breakpoints.up('tablet')]: {
        gridTemplateColumns: 'auto minmax(0,1fr) auto',
        gridTemplateAreas: `"logo search right"`,
        columnGap: theme.spacing(3),
        rowGap: 0,
    },
}));

export const LogoWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    gridArea: 'logo',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1, 3),
    borderRadius: typography.typographyUtil.pxToRem(8),
    width: 90,
    height: 40,
    cursor: 'pointer',
}));

export const SearchWrapper = styled(Box)({
    gridArea: 'search',
    minWidth: 0,
});

export const RightSection = styled(Stack)(({ theme }: { theme: Theme }) => ({
    gridArea: 'right',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(3),
    flexShrink: 0,

    [theme.breakpoints.up('tablet')]: {
        gap: theme.spacing(5),
    },
}));

export const ActionWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});
