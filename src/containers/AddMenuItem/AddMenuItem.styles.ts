import { ThemeType } from '@components/types';
import { Box, FormControl, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const Root = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(4),
    marginTop: typography.typographyUtil.pxToRem(35),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4, 0),
    },
}));

export const HeadingWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: typography.typographyUtil.pxToRem(20),
}));

export const MenuForm = styled('form')(() => ({
    width: '100%',
}));

export const FormContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    width: '100%',
    margin: theme.spacing(12, 0),
}));

export const FormGrid = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '100%',
}));

export const MetaContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: theme.spacing(4),
    },
}));

export const SelectFormControl = styled(FormControl)(() => ({
    margin: typography.typographyUtil.pxToRem(2),
    width: '100%',
}));

export const RangeContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: theme.spacing(4),
    },
}));

export const FooterContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: theme.spacing(2),
        marginTop: theme.spacing(5),
    },
}));

export const ActionContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(4),
}));
