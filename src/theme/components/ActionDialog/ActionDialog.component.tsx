import CheckIcon from '@mui/icons-material/Check';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from '@mui/material';
import { alpha, styled, Theme } from '@mui/material';

import { ActionDialogProps } from './ActionDialog.types';
import { ACTION_DIALOG_TYPES, DialogType } from '../constants';

const StyledDialog = styled(Dialog)(({ theme }: { theme: Theme }) => ({
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

const ContentContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(6, 4),
    display: 'flex',
    gap: theme.spacing(4),
    alignItems: 'flex-start',
}));

const IconContainer = styled(Box, {
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
        width: theme.spacing(12),
        height: theme.spacing(12),
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: baseColor,
        boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.02), 
            inset 0 1px 1px ${alpha('#ffffff', 0.8)}
        `,

        [theme.breakpoints.up('tablet')]: {
            display: 'flex',
        },
    };
});

const TextContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    flex: 1,
}));

const StyledDialogTitle = styled(DialogTitle)(
    ({ theme }: { theme: Theme }) => ({
        padding: 0,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        background: 'linear-gradient(180deg, #1a1c1e 10%, #5c636a 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1.2,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
    }),
);

const StyledDialogContent = styled(DialogContent)({
    padding: 0,
});

const StyledDialogContentText = styled(DialogContentText)(
    ({ theme }: { theme: Theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        color: theme.palette.text.secondary,
        lineHeight: 1.5,
        letterSpacing: '0.02em',
        textAlign: 'justify',
    }),
);

const StyledDialogActions = styled(DialogActions)(
    ({ theme }: { theme: Theme }) => ({
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.05),
        padding: theme.spacing(3, 3),
        justifyContent: 'flex-end',
        gap: theme.spacing(1.5),
    }),
);

const StyledPrivacyIcon = styled(PrivacyTipOutlinedIcon)({
    fontSize: 30,
});

const StyledCheckIcon = styled(CheckIcon)({
    fontSize: 30,
});

export const ActionDialog = ({
    open,
    type = ACTION_DIALOG_TYPES.CONFIRM,
    title,
    description,
    cancelText = 'Cancel',
    confirmText,
    icon,
    onClose,
    onConfirm,
}: ActionDialogProps) => {
    const finalConfirmText =
        confirmText ||
        (type === ACTION_DIALOG_TYPES.ALERT ? 'Continue' : 'Yes, Confirm');

    const renderIcon = () => {
        if (icon) return icon;
        return type === ACTION_DIALOG_TYPES.ALERT ? (
            <StyledPrivacyIcon />
        ) : (
            <StyledCheckIcon />
        );
    };

    return (
        <StyledDialog open={open} onClose={onClose}>
            <ContentContainer>
                <IconContainer dialogType={type}>{renderIcon()}</IconContainer>
                <TextContainer>
                    <StyledDialogTitle>{title}</StyledDialogTitle>
                    <StyledDialogContent>
                        <StyledDialogContentText>
                            {description}
                        </StyledDialogContentText>
                    </StyledDialogContent>
                </TextContainer>
            </ContentContainer>
            <Divider />
            <StyledDialogActions>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color={
                        type === ACTION_DIALOG_TYPES.ALERT ? 'primary' : 'error'
                    }
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    disableElevation
                    variant="contained"
                    color={
                        type === ACTION_DIALOG_TYPES.ALERT ? 'error' : 'primary'
                    }
                >
                    {finalConfirmText}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
