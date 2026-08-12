import { DialogType } from '@components/constants';

export type DialogState = {
    open: boolean;
    title: string;
    description: string;
    type: DialogType;
    confirmText?: string;
    cancelText?: string;
};

export type FeedbackPayload = {
    title: string;
    description: string;
    type: DialogType;
    confirmText?: string;
    cancelText?: string;
};
