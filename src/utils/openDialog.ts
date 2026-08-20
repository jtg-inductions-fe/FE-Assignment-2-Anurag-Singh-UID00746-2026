import { ACTION_DIALOG_TYPES } from '@components/constants';
import { openDialog } from '@features/feedback/feedbackSlice';
import { ShowDialogProps } from './types';
import { AppDispatch } from '@store/index';

/**
 * Dispatches the open dialog action of the slice
 * @param config - Metadata of the feedback modal.
 * @param dispatch - function to dispatch the action.
 */
export const showDialog = (config: ShowDialogProps, dispatch: AppDispatch) => {
    dispatch(
        openDialog({
            ...config,
            type: config.type ?? ACTION_DIALOG_TYPES.CONFIRM,
        }),
    );
};
