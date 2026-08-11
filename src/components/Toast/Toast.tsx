import { Snackbar } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';

import { TOAST_ICONS } from './Toast.icons';
import {
    StyledAtoms,
    StyledContent,
    StyledMessage,
    StyledTitle,
    StyledToast,
    StyledToastImage,
} from './Toast.styles';
import type { ToastProps } from './Toast.types';

export const Transition = (props: SlideProps) => (
    <Slide {...props} direction="left" />
);

export const Toast = ({
    open,
    type,
    title,
    message,
    autoHideDuration = 4000,
    onClose,
    ...props
}: ToastProps) => {
    const assets = TOAST_ICONS[type];

    return (
        <Snackbar
            {...props}
            open={open}
            onClose={onClose}
            autoHideDuration={autoHideDuration}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            TransitionComponent={Transition}
        >
            <StyledToast>
                <StyledToastImage src={assets.toast} alt={type} />
                <StyledContent>
                    <StyledTitle variant="subtitle1">{title}</StyledTitle>
                    <StyledMessage variant="body2">{message}</StyledMessage>
                </StyledContent>

                <StyledAtoms src={assets.atoms} alt="Toast atoms" />
            </StyledToast>
        </Snackbar>
    );
};
