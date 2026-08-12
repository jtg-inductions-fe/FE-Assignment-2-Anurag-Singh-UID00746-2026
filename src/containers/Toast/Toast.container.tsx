import { Snackbar as MuiSnackbar, Slide as MuiSlide } from '@mui/material';
import type { LinearProgressProps, SlideProps } from '@mui/material';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { hideToast } from '@features/toast/toastSlice';

import { TOAST_ICONS } from './Toast.icons';
import {
    StyledAtoms,
    StyledContent,
    StyledMessage,
    StyledProgress,
    StyledTitle,
    StyledToast,
    StyledToastImage,
} from './Toast.styles';
import type { ToastProps } from './Toast.types';
import { TOAST_TYPES } from '@components/constants';

const getProgressColor = (
    variant: ToastProps['type'],
): LinearProgressProps['color'] => {
    switch (variant) {
        case TOAST_TYPES.SUCCESS:
            return 'success';

        case TOAST_TYPES.ERROR:
            return 'error';

        case TOAST_TYPES.WARNING:
            return 'warning';

        default:
            return 'info';
    }
};

export const Transition = (props: SlideProps) => (
    <MuiSlide {...props} direction="left" />
);

const Toast = () => {
    const dispatch = useAppDispatch();
    const { open, type, title, message } = useAppSelector(
        (state) => state.toast,
    );

    if (!open) return null;

    const assets = TOAST_ICONS[type];

    return (
        <MuiSnackbar
            open={open}
            onClose={() => dispatch(hideToast())}
            autoHideDuration={2000}
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

                <StyledProgress
                    variant="indeterminate"
                    color={getProgressColor(type)}
                />
            </StyledToast>
        </MuiSnackbar>
    );
};

export default Toast;
