import * as yup from 'yup';

export const rejectionSchema = yup.object().shape({
    reason: yup
        .string()
        .required('Reason for rejection is required')
        .max(150, 'Reason cannot be more than 150 characters'),
});
