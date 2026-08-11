import { TOAST_TYPES } from '@components/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastState } from './toast.types';

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

const initialState: ToastState = {
    open: false,
    type: 'success',
    title: '',
    message: '',
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (
            state,
            action: PayloadAction<{
                type: ToastType;
                title: string;
                message: string;
            }>,
        ) => {
            state.open = true;
            const { type, title, message } = action.payload;
            state.type = type;
            state.title = title;
            state.message = message;
        },

        hideToast: (state) => {
            state.open = false;
            state.title = '';
            state.message = '';
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
