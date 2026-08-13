import { Snackbar as MuiSnackbar } from '@mui/material';
import { Slide as MuiSlide, SlideProps } from '@mui/material';

import { TOAST_ICONS } from './Toast.icons';
import {
    StyledAtoms,
    StyledContent,
    StyledMessage,
    StyledTitle,
    StyledToast,
    StyledToastImage,
} from './Toast.styles';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { hideToast } from '@features/toast/toastSlice';

export const Transition = (props: SlideProps) => (
    <MuiSlide {...props} direction="left" />
);

export const Toast = () => {
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
            </StyledToast>
        </MuiSnackbar>
    );
};
