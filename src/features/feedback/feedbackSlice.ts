import { ACTION_DIALOG_TYPES } from '@components/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogState, FeedbackPayload } from './feedback.types';

const initialState: DialogState = {
    open: false,
    title: '',
    description: '',
    type: undefined,
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
