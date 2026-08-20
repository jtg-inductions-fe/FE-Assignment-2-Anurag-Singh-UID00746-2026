import { ThemeType } from '@components/types';
import { alpha, Select, styled } from '@mui/material';

import { typography } from '@theme/foundations';

export const StyledBaseSelect = styled(Select)(({ theme }: ThemeType) => ({
    margin: typography.typographyUtil.pxToRem(2),
    width: '100%',
    backgroundColor: alpha(theme.palette.secondary.light, 0.2),

    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.light,
        borderWidth: typography.typographyUtil.pxToRem(1),
    },

    '& .MuiSelect-select': {
        color: alpha(theme.palette.common.black, 0.8),
        fontSize: typography.typographyUtil.pxToRem(14),
        padding: theme.spacing(3, 2),
    },

    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
        borderWidth: typography.typographyUtil.pxToRem(1.5),
    },
}));
