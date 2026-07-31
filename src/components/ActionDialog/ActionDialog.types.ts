import { ACTION_DIALOG_TYPES } from '../constants';

export type DialogType =
    (typeof ACTION_DIALOG_TYPES)[keyof typeof ACTION_DIALOG_TYPES];

export interface ActionDialogProps {
    open: boolean;
    type?: DialogType;
    title: string;
    description: string;
    cancelText?: string;
    confirmText?: string;
    icon?: React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}
