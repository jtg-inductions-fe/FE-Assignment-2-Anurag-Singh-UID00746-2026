import { useEffect, useRef } from 'react';

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
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
    const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
    const finalConfirmText =
        confirmText ||
        (type === ACTION_DIALOG_TYPES.ALERT ? 'Continue' : 'Confirm');

    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => {
                cancelButtonRef.current?.focus();
            });
        }
    }, [open]);

    const handleDialogKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
        if (event.key !== 'Tab') {
            return;
        }

        const dialogButtons = [
            cancelButtonRef.current,
            confirmButtonRef.current,
        ].filter(Boolean) as HTMLButtonElement[];

        if (dialogButtons.length === 0) {
            return;
        }

        const currentIndex = dialogButtons.findIndex(
            (button) => button === document.activeElement,
        );
        const direction = event.shiftKey ? -1 : 1;
        const nextIndex =
            currentIndex === -1
                ? 0
                : (currentIndex + direction + dialogButtons.length) %
                  dialogButtons.length;

        event.preventDefault();
        dialogButtons[nextIndex]?.focus();
    };

    const renderIcon = () => {
        if (icon) return icon;
        return type === ACTION_DIALOG_TYPES.ALERT ? (
            <StyledPrivacyIcon />
        ) : (
            <StyledCheckIcon />
        );
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            onKeyDown={handleDialogKeyDown}
        >
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
                    ref={cancelButtonRef}
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
                    ref={confirmButtonRef}
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
