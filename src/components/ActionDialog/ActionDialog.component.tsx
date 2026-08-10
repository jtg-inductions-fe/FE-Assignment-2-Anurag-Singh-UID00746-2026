import { Divider as MuiDivider } from '@mui/material';
import Button from '@components/Button/Button.component';
import CheckIcon from '@mui/icons-material/Check';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';

import {
    ContentContainer,
    IconContainer,
    StyledDialog,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogContentText,
    StyledDialogTitle,
    TextContainer,
} from './ActionDialog.styles';
import { ActionDialogProps } from './ActionDialog.types';
import { ACTION_DIALOG_TYPES } from '../constants';

export const ActionDialog = ({
    open,
    type = ACTION_DIALOG_TYPES.CONFIRM,
    title,
    description,
    cancelText = 'Cancel',
    confirmText,
    icon,
    cancelButtonColor,
    confirmButtonColor,
    cancelButtonProps,
    confirmButtonProps,
    onClose,
    onConfirm,
}: ActionDialogProps) => {
    const finalConfirmText =
        confirmText ||
        (type === ACTION_DIALOG_TYPES.ALERT ? 'Continue' : 'Confirm');

    const cancelColor =
        cancelButtonColor ??
        cancelButtonProps?.color ??
        (type === ACTION_DIALOG_TYPES.ALERT ? 'primary' : 'error');

    const confirmColor =
        confirmButtonColor ??
        confirmButtonProps?.color ??
        (type === ACTION_DIALOG_TYPES.ALERT ? 'error' : 'primary');

    const renderIcon = () => {
        if (icon) return icon;
        return type === ACTION_DIALOG_TYPES.ALERT ? (
            <PrivacyTipOutlinedIcon fontSize="large" />
        ) : (
            <CheckIcon fontSize="large" />
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
            <MuiDivider />
            <StyledDialogActions>
                <Button
                    {...cancelButtonProps}
                    onClick={onClose}
                    variant={cancelButtonProps?.variant ?? 'outlined'}
                    disableRipple
                    color={cancelColor}
                >
                    {cancelText}
                </Button>
                <Button
                    {...confirmButtonProps}
                    onClick={onConfirm}
                    disableElevation
                    disableRipple
                    variant={confirmButtonProps?.variant ?? 'contained'}
                    color={confirmColor}
                >
                    {finalConfirmText}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
