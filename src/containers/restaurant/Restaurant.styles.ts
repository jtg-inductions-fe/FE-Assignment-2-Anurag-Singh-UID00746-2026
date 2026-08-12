import { ThemeType } from '@components/types';
import { Box, Chip, Container, Divider, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const Wrapper = styled(Container)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const HeaderWrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: theme.spacing(8, 0),
}));

export const HeaderContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

export const CustomChip = styled(Chip)(({ theme }: ThemeType) => ({
    backgroundColor: 'transparent',
    height: 'auto',
    padding: theme.spacing(2, 4),
}));

export const CustomDivider = styled(Divider)(({ theme }: ThemeType) => ({
    display: 'none',

    [theme.breakpoints.up('sm')]: {
        display: 'flex',
    },
}));

export const ContactWrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(5, 0),
    gap: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

export const TimingChip = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'start',
    padding: theme.spacing(2, 4),
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: typography.typographyUtil.pxToRem(10),
    gap: theme.spacing(3),
    maxWidth: typography.typographyUtil.pxToRem(265),

    [theme.breakpoints.up('sm')]: {
        maxWidth: 'none',
    },
}));
