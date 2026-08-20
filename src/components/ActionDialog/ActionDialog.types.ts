import { ACTION_DIALOG_TYPES } from '@components/constants';
import type { ButtonProps, ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export type DialogType =
    (typeof ACTION_DIALOG_TYPES)[keyof typeof ACTION_DIALOG_TYPES];

export type ActionDialogButtonColor = MuiButtonProps['color'];

/**
 * Represents the type of Action dialog's prop.
 */
export interface ActionDialogProps {
    /** Controls the visibility of the dialog (true = visible) */
    open: boolean;

    /** Optional design theme or behavior variant of the dialog */
    type?: DialogType;

    /** Main heading text displayed at the top of the dialog */
    title: string;

    /** Detailed message or body text shown to the user */
    description: string;

    /** Custom label text for the dismiss/cancel button */
    cancelText?: string;

    /** Custom label text for the primary action button */
    confirmText?: string;

    /** Optional custom icon element to render inside the layout */
    icon?: ReactNode;

    /** Optional config for the cancel button */
    cancelButtonConfig?: ButtonProps;

    /** Optional config for the confirm button */
    confirmButtonConfig?: ButtonProps;

    /** Callback function triggered when the dialog is dismissed or closed */
    onClose: () => void;

    /** Callback function triggered when the primary action button is clicked */
    onConfirm: () => void;
}
