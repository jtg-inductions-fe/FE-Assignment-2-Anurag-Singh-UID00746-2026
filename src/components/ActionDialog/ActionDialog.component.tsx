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
            <PrivacyTipOutlinedIcon fontSize="large" />
        ) : (
            <CheckIcon fontSize="large" />
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
                    {finalConfirmText}
                </Button>
            </StyledDialogActions>
        </StyledDialog>
    );
};
