import { ReactNode } from 'react';

import { ACTION_DIALOG_TYPES } from '../constants';

export type DialogType =
    (typeof ACTION_DIALOG_TYPES)[keyof typeof ACTION_DIALOG_TYPES];

/**
 * Represents the type of Action dialog's prop.
 */
export interface ActionDialogProps {
    open: boolean;
    type?: DialogType;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    icon?: ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}
