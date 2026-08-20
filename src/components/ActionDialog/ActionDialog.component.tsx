import { Divider as MuiDivider } from '@mui/material';
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
import { Button } from '@components/Button/Button.component';

export const ActionDialog = (props: ActionDialogProps) => {
    const { type = ACTION_DIALOG_TYPES.CONFIRM, cancelText = 'Cancel' } = props;

    const renderIcon = () => {
        if (props.icon) return props.icon;
        return type === ACTION_DIALOG_TYPES.ALERT ? (
            <PrivacyTipOutlinedIcon fontSize="large" />
        ) : (
            <CheckIcon fontSize="large" />
        );
    };

    return (
        <StyledDialog open={props.open} onClose={props.onClose}>
            <ContentContainer>
                <IconContainer dialogType={type}>{renderIcon()}</IconContainer>
                <TextContainer>
                    <StyledDialogTitle>{props.title}</StyledDialogTitle>
                    <StyledDialogContent>
                        <StyledDialogContentText>
                            {props.description}
                        </StyledDialogContentText>
                    </StyledDialogContent>
                </TextContainer>
            </ContentContainer>
            <MuiDivider />
            <StyledDialogActions>
                <Button
                    {...props.cancelButtonConfig}
                    onClick={props.onClose}
                    disableRipple
                >
                    {cancelText}
                </Button>
                <Button
                    {...props.confirmButtonConfig}
                    onClick={props.onConfirm}
                    disableElevation
                    disableRipple
                >
                    {props.confirmText}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
