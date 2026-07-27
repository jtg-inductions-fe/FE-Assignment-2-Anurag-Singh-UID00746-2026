import { Box, LinearProgress, Snackbar, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material';
import Slide, { SlideProps } from '@mui/material/Slide';
import { alpha, styled } from '@mui/material/styles';

import { TOAST_ICONS } from './Toast.icons';
import type { ToastProps } from './Toast.types';
import { TOAST_TYPES } from '../constants';

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

export const StyledSnackbar = styled(Snackbar)(() => ({}));

export const StyledToast = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    minWidth: theme.spacing(90),
    maxWidth: theme.spacing(150),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `
        0px 2px 4px ${alpha('#0F172A', 0.02)}, 
        0px 12px 32px ${alpha('#0F172A', 0.06)}, 
        0px 20px 48px ${alpha('#0F172A', 0.04)}
    `,
    padding: theme.spacing(2),
    gap: theme.spacing(2.5),
}));

export const StyledToastImage = styled('img')(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    flexShrink: 0,
    objectFit: 'contain',
}));

export const StyledAtoms = styled('img')(({ theme }) => ({
    width: theme.spacing(14),
    pointerEvents: 'none',
    userSelect: 'none',
    margin: theme.spacing(0, 1),
}));

export const StyledContent = styled(Box)(() => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
}));

export const StyledMessage = styled(Typography)(({ theme }) => ({
    color: alpha(theme.palette.text.secondary, 0.8),
}));

export const StyledProgress = styled(LinearProgress)(() => ({
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 4,
}));

export const Transition = (props: SlideProps) => <Slide {...props} direction="left" />;

const Toast = ({
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
        <StyledSnackbar
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

                <StyledProgress
                    variant="indeterminate"
                    color={getProgressColor(type)}
                />
            </StyledToast>
        </StyledSnackbar>
    );
};

export default Toast;
