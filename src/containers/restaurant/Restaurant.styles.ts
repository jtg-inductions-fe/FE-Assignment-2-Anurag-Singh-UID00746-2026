import { Box, Chip, Container, Divider, styled, Theme } from '@mui/material';
import { typography } from '@theme/foundations';

export const Wrapper = styled(Container)(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
    };
});

export const HeaderWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: theme.spacing(8, 0),
}));

export const HeaderContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

export const CustomChip = styled(Chip)({
    backgroundColor: 'transparent',
    height: 'auto',
    padding: '6px 12px',
});

export const CustomDivider = styled(Divider)(({ theme }: { theme: Theme }) => ({
    display: 'none',

    [theme.breakpoints.up('tablet')]: {
        display: 'flex',
    },
}));

export const ContactWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(3, 0),
    gap: theme.spacing(3),

    [theme.breakpoints.up('tablet')]: {
        flexDirection: 'row',
    },
}));

export const TimingChip = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    alignItems: 'start',
    padding: theme.spacing(2, 3),
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: typography.typographyUtil.pxToRem(10),
}));
