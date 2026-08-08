import ErrorAtoms from '../../../assets/images/error-atoms.webp';
import ErrorToast from '../../../assets/images/error-toast.webp';
import InfoAtoms from '../../../assets/images/info-atoms.webp';
import InfoToast from '../../../assets/images/info-toast.webp';
import SuccessAtoms from '../../../assets/images/success-atoms.webp';
import SuccessToast from '../../../assets/images/success-toast.webp';
import WarningAtoms from '../../../assets/images/warning-atoms.webp';
import WarningToast from '../../../assets/images/warning-toast.webp';
import { TOAST_TYPES, ToastType } from '../constants';

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
