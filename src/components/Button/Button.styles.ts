import { ThemeType } from '@components/types';
import { Button, styled } from '@mui/material';

import { typography } from '@theme/foundations';

export const StyledButton = styled(Button)(({ theme }: ThemeType) => ({
    letterSpacing: typography.typographyUtil.pxToRem(0.5),
    borderRadius: typography.typographyUtil.pxToRem(8),
    minHeight: typography.typographyUtil.pxToRem(40),
    whiteSpace: 'nowrap',
    minWidth: 'max-content',

    '& .MuiButton-loadingIndicator': {
        color: theme.palette.common.black,
    },

    '&.MuiButton-contained': {
        boxShadow:
            'inset 0px -4px 0px rgba(0, 0, 0, 0.2), 0px 4px 10px rgba(0, 0, 0, 0.15)',
    },

    '&.MuiButton-text': {
        backgroundColor: 'transparent',
        padding: 0,
    },

    '&.Mui-disabled': {
        transform: 'none',
        boxShadow: 'none',
        opacity: 0.5,
    },
}));
