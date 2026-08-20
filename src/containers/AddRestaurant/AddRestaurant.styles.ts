import { ThemeType } from '@components/types';
import { alpha, Box, FormControl, styled, Theme } from '@mui/material';
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

export const TimeRangeContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    gap: theme.spacing(4),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const OperatingDaysContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
    width: '100%',
}));

export const OperatingDayChip = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{
    selected: boolean;
}>(({ theme, selected }: { theme: Theme; selected?: boolean }) => ({
    minWidth: typography.typographyUtil.pxToRem(72),
    height: typography.typographyUtil.pxToRem(48),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    borderRadius: theme.shape.borderRadius * 2,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all .25s ease',
    padding: theme.spacing(2, 5),
    border: `1px solid ${
        selected ? theme.palette.primary.light : theme.palette.divider
    }`,
    backgroundColor: selected
        ? alpha(theme.palette.primary.light, 0.4)
        : theme.palette.common.white,

    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,

    '&:hover': {
        borderColor: theme.palette.primary.main,
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
