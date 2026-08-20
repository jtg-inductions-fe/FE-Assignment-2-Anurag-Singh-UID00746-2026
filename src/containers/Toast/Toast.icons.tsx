import ErrorAtoms from '/images/error-atoms.webp';
import ErrorToast from '/images/error-toast.webp';
import InfoAtoms from '/images/info-atoms.webp';
import InfoToast from '/images/info-toast.webp';
import SuccessAtoms from '/images/success-atoms.webp';
import SuccessToast from '/images/success-toast.webp';
import WarningAtoms from '/images/warning-atoms.webp';
import WarningToast from '/images/warning-toast.webp';
import { ToastType } from './Toast.types';
import { TOAST_TYPES } from '@components/constants';

interface ToastAsset {
    toast: string;
    atoms: string;
}

export const TOAST_ICONS: Record<ToastType, ToastAsset> = {
    [TOAST_TYPES.SUCCESS]: {
        toast: SuccessToast,
        atoms: SuccessAtoms,
    },

    [TOAST_TYPES.ERROR]: {
        toast: ErrorToast,
        atoms: ErrorAtoms,
    },

    [TOAST_TYPES.WARNING]: {
        toast: WarningToast,
        atoms: WarningAtoms,
    },

    [TOAST_TYPES.INFO]: {
        toast: InfoToast,
        atoms: InfoAtoms,
    },
};
