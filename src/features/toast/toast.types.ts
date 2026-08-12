import { ToastType } from '@components/constants';

export type ToastState = {
    /** True if the toast is currently visible on the screen. */
    open: boolean;
    /** The style category of the toast. */
    type: ToastType;
    /** The bold title text shown at the top of the toast. */
    title: string;
    /** The main descriptive message inside the toast. */
    message: string;
};
