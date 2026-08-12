import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { ACTION_DIALOG_TYPES, DialogType } from '@components/constants';
import { ThemeType } from '@components/types';

export const StyledDialog = styled(Dialog)(({ theme }: ThemeType) => ({
    '& .MuiPaper-root': {
        borderRadius: theme.shape.borderRadius * 2,
        padding: 0,
        maxWidth: theme.spacing(100),
        width: '100%',
        backgroundImage: 'none',
        boxShadow:
            '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',

        [theme.breakpoints.up('sm')]: {
            maxWidth: theme.spacing(130),
        },
    },
}));

export const ContentContainer = styled(Box)(({ theme }: ThemeType) => ({
    padding: theme.spacing(6, 4),
    display: 'flex',
    gap: theme.spacing(4),
    alignItems: 'flex-start',
}));

export const IconContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'dialogType',
})<{ dialogType: DialogType }>(({ dialogType, theme }) => {
    const isAlert = dialogType === ACTION_DIALOG_TYPES.ALERT;

    const baseColor = isAlert
        ? theme.palette.error.main
        : theme.palette.primary.main;
    const bgColor = isAlert
        ? alpha(theme.palette.error.main, 0.08)
        : alpha(theme.palette.primary.main, 0.08);

    return {
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: theme.spacing(14),
        height: theme.spacing(14),
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: baseColor,
        boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.02), 
            inset 0 1px 1px ${alpha('#ffffff', 0.8)}
        `,

        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    };
});

export const TextContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    flex: 1,
}));

export const StyledDialogTitle = styled(DialogTitle)(
    ({ theme }: ThemeType) => ({
        padding: 0,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.2,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    }),
);

export const StyledDialogContent = styled(DialogContent)({
    padding: 0,
});

export const StyledDialogContentText = styled(DialogContentText)(
    ({ theme }: ThemeType) => ({
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
        textAlign: 'justify',
    }),
);

export const StyledDialogActions = styled(DialogActions)(
    ({ theme }: ThemeType) => ({
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.05),
        padding: theme.spacing(3, 3),
        justifyContent: 'flex-end',
        gap: theme.spacing(1.5),
    }),
);
