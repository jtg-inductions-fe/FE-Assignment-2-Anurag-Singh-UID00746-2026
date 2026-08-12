import { ThemeType } from '@components/types';
import { Chip, styled } from '@mui/material';

import { typography } from '@theme/foundations';

export const StyledChip = styled(Chip)(({ theme }: ThemeType) => ({
    borderRadius: typography.typographyUtil.pxToRem(6),
    fontWeight: theme.typography.fontWeightBold,
    fontSize: typography.typographyUtil.pxToRem(11),
    letterSpacing: typography.typographyUtil.pxToRem(1),
    textTransform: 'uppercase',

    transition: theme.transitions.create([
        'background-color',
        'color',
        'border-color',
    ]),

    '&.MuiChip-colorSuccess': {
        backgroundColor: 'rgba(46, 125, 50, 0.08)',
        color: theme.palette.success.dark,
        border: '1px solid rgba(46, 125, 50, 0.2)',
        '& .MuiChip-icon': {
            color: theme.palette.success.main,
        },
    },

    '&.MuiChip-colorError': {
        backgroundColor: 'rgba(211, 47, 47, 0.08)',
        color: theme.palette.error.dark,
        border: '1px solid rgba(211, 47, 47, 0.2)',
        '& .MuiChip-icon': {
            color: theme.palette.error.main,
        },
    },

    '&.MuiChip-colorWarning': {
        backgroundColor: 'rgba(237, 108, 2, 0.08)',
        color: theme.palette.warning.dark,
        border: '1px solid rgba(237, 108, 2, 0.2)',
        '& .MuiChip-icon': {
            color: theme.palette.warning.main,
        },
    },

    '&.MuiChip-sizeSmall': {
        height: typography.typographyUtil.pxToRem(22),
        padding: theme.spacing(0, 4),
        fontSize: typography.typographyUtil.pxToRem(10),
    },
}));
