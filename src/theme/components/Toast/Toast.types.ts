import type { SnackbarProps } from '@mui/material';

import { TOAST_TYPES } from '../constants';

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
export interface ToastProps
    extends Omit<
        SnackbarProps,
        'message' | 'children' | 'onClose' | 'autoHideDuration' | 'anchorOrigin'
    > {
    type: ToastType;
    title: string;
    message: string;
    autoHideDuration?: number | null;
    onClose: () => void;
}
