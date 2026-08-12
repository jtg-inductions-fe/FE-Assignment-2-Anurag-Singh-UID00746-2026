import * as yup from 'yup';
import { messages } from './constants';

export const restaurantSchema = yup.object({
    imageUrl: yup
        .string()
        .url('Enter a valid image URL')
        .required(messages.REQUIRED),

    name: yup
        .string()
        .trim()
        .required(messages.REQUIRED)
        .min(3, 'Restaurant name must be at least 3 characters')
        .max(50, 'Restaurant name cannot exceed 50 characters'),

    description: yup
        .string()
        .trim()
        .required(messages.REQUIRED)
        .max(250, 'Description cannot exceed 250 characters'),

    address: yup.string().trim().required(messages.REQUIRED),

    contactNumber: yup
        .string()
        .required(messages.REQUIRED)
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10 digit mobile number'),

    category: yup.string().required(messages.REQUIRED),

    openingTime: yup.string().required(messages.REQUIRED),

    closingTime: yup
        .string()
        .required(messages.REQUIRED)
        .test(
            'closing-time',
            'Closing time must be after opening time',
            function (value) {
                const openingTime = this.parent.openingTime;

                if (!openingTime || !value) {
                    return true;
                }

                return value > openingTime;
            },
        ),

    operatingDays: yup
        .array()
        .of(yup.string().required())
        .required('Select at least one operating day')
        .min(1, 'Select at least one operating day'),
});
