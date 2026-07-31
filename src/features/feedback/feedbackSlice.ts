import { ACTION_DIALOG_TYPES, DialogType } from '@components/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackPayload {
    title: string;
    description: string;
    type: DialogType;
    confirmText?: string;
    cancelText?: string;
}
interface DialogState {
    open: boolean;
    title: string;
    description: string;
    type: DialogType;
    confirmText?: string;
    cancelText?: string;
}

const initialState: DialogState = {
    open: false,
    title: '',
    description: '',
    type: ACTION_DIALOG_TYPES.CONFIRM,
    confirmText: undefined,
    cancelText: undefined,
};

const feedbackSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action: PayloadAction<FeedbackPayload>) => {
            state.open = true;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.type = action.payload.type ?? ACTION_DIALOG_TYPES.CONFIRM;
            state.confirmText = action.payload.confirmText;
            state.cancelText = action.payload.cancelText;
        },

        closeDialog: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { openDialog, closeDialog } = feedbackSlice.actions;

export default feedbackSlice.reducer;
