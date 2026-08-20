import { ThemeType } from '@components/types';
import { alpha, styled, TextField } from '@mui/material';

import { typography } from '@theme/foundations';

export const StyledTextField = styled(TextField)(({ theme }: ThemeType) => ({
    width: '100%',

    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(theme.palette.secondary.light, 0.2),
        transition: 'all 0.2s ease-in-out',

        '& fieldset': {
            borderColor: theme.palette.secondary.light,
            borderWidth: typography.typographyUtil.pxToRem(1),
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
            borderWidth: typography.typographyUtil.pxToRem(1.5),
        },
        '& input': {
            color: alpha(theme.palette.common.black, 0.8),
            fontSize: typography.typographyUtil.pxToRem(14),
            padding: theme.spacing(3, 2),

            '&::placeholder': {
                color: alpha(theme.palette.text.secondary, 0.5),
                letterSpacing: typography.typographyUtil.pxToRem(0.3),
                opacity: 1,
            },
        },
    },

    '& .MuiFormHelperText-root': {
        marginLeft: typography.typographyUtil.pxToRem(2),
        marginTop: typography.typographyUtil.pxToRem(8),
    },

    '& .MuiFormHelperText-root.Mui-error': {
        fontSize: typography.typographyUtil.pxToRem(14),
    },
}));
