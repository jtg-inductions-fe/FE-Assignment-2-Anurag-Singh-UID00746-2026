import { DialogType } from '@components/constants';

export type DialogState = {
    /** True if the pop-up window is visible on the screen. */
    open: boolean;

    /** The main heading text shown at the top of the pop-up. */
    title: string;

    /** The message or main explanation text inside the pop-up. */
    description: string;

    /** The style or category of the pop-up, like alert, success, or warning. */
    type?: DialogType;

    /** Optional text for the button that agrees or moves forward. */
    confirmText?: string;

    /** Optional text for the button that closes or cancels the pop-up. */
    cancelText?: string;
};

export type FeedbackPayload = {
    /** The main heading text for the feedback pop-up. */
    title: string;

    /** The message text explaining the feedback topic. */
    description: string;

    /** The style category for this feedback, like positive or negative. */
    type: DialogType;

    /** Optional text for the main feedback submission button. */
    confirmText?: string;

    /** Optional text for the button to dismiss the feedback. */
    cancelText?: string;
};
