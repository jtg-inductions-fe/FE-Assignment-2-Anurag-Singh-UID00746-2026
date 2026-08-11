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
import { ACTION_DIALOG_TYPES } from '@components/constants';

export const ActionDialog = ({
    open,
    type = ACTION_DIALOG_TYPES.CONFIRM,
    title,
    description,
    cancelText = 'Cancel',
    confirmText,
    icon,
    cancelButtonConfig,
    confirmButtonConfig,
    onClose,
    onConfirm,
}: ActionDialogProps) => {
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
                <Button {...cancelButtonConfig} onClick={onClose} disableRipple>
                    {cancelText}
                </Button>
                <Button
                    {...confirmButtonConfig}
                    onClick={onConfirm}
                    disableElevation
                    disableRipple
                >
                    {confirmText}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
