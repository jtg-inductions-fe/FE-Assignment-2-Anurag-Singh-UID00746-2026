import { ToastType } from '@components/constants';

export type ToastState = {
    open: boolean;
    type: ToastType;
    title: string;
    message: string;
};
