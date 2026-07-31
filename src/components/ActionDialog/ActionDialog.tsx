import { Divider } from '@mui/material';

import MyButton from '@components/Button/Button';

import {
    ContentContainer,
    IconContainer,
    StyledCheckIcon,
    StyledDialog,
    StyledDialogActions,
    StyledDialogContent,
    StyledDialogContentText,
    StyledDialogTitle,
    StyledPrivacyIcon,
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
    onClose,
    onConfirm,
}: ActionDialogProps) => {
    const finalConfirmText =
        confirmText ||
        (type === ACTION_DIALOG_TYPES.ALERT ? 'Continue' : 'Confirm');

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
                <MyButton
                    onClick={onClose}
                    variant="outlined"
                    disableRipple
                    color={
                        type === ACTION_DIALOG_TYPES.ALERT ? 'primary' : 'error'
                    }
                >
                    {cancelText}
                </MyButton>
                <MyButton
                    onClick={onConfirm}
                    disableElevation
                    disableRipple
                    variant="contained"
                    color={
                        type === ACTION_DIALOG_TYPES.ALERT ? 'error' : 'primary'
                    }
                >
                    {finalConfirmText}
                </MyButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};
