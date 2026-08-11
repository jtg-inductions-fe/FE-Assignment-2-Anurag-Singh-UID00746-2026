import { TOAST_TYPES } from '@components/constants';
import type { SnackbarProps } from '@mui/material';

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

/**
 * Represents the type of Toast's prop.
 */
export interface ToastProps
    extends Omit<
        SnackbarProps,
        'message' | 'children' | 'onClose' | 'autoHideDuration' | 'anchorOrigin'
    > {
    /** Theme style of the toast notification */
    type: ToastType;

    /** Heading text displayed at the top of the toast */
    title: string;

    /** Main body text or notification message shown to the user */
    message: string;

    /** Time in milliseconds before the toast automatically closes, or null to keep it open */
    autoHideDuration?: number | null;

    /** Callback function triggered when the toast alert is closed or dismissed */
    onClose: () => void;
}
