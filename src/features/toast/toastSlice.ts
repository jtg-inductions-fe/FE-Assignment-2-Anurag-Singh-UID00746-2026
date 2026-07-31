import { TOAST_TYPES } from '@components/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];

type ToastState = {
    open: boolean;
    type: ToastType;
    title: string;
    message: string;
};

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
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.message = action.payload.message;
        },

        hideToast: (state) => {
            state.open = false;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
