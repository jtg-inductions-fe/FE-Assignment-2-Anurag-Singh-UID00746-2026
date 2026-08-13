import { DialogType } from '@components/constants';

export type ShowDialogProps = {
    /** Optional variant of the dialog */
    type?: DialogType;

    /** Main heading text displayed at the top of the dialog */
    title: string;

    /** Detailed message or body text shown to the user */
    description: string;

    /** Custom label text for the dismiss/cancel button */
    cancelText?: string;

    /** Custom label text for the primary action button */
    confirmText?: string;
};
