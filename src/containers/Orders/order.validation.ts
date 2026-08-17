import { messages } from '@validations/constants';
import * as yup from 'yup';

export const rejectionSchema = yup.object().shape({
    reason: yup
        .string()
        .required(messages.REQUIRED)
        .max(150, 'Reason cannot be more than 150 characters'),
});
