export const ACTION_DIALOG_TYPES = {
    ALERT: 'alert',
    CONFIRM: 'confirm',
} as const;

export const EXCEPTION_STATE_TYPES = {
    ERROR: 'error',
    EMPTY: 'empty',
} as const;

export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
} as const;

export type DialogType =
    (typeof ACTION_DIALOG_TYPES)[keyof typeof ACTION_DIALOG_TYPES];

export type ExceptionStateType =
    (typeof EXCEPTION_STATE_TYPES)[keyof typeof EXCEPTION_STATE_TYPES];

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
