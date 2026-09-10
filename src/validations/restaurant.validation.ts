import * as yup from 'yup';

import { messages } from './constants';

export const restaurantSchema = yup.object({
    imageUrl: yup
        .string()
        .trim()
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

    address: yup
        .object({
            addressLine1: yup.string().trim().required(messages.REQUIRED),
            addressLine2: yup.string().trim().nullable().notRequired(),
            city: yup.string().trim().required(messages.REQUIRED),
            state: yup.string().trim().required(messages.REQUIRED),
            postalCode: yup.string().trim().required(messages.REQUIRED),
            country: yup.string().trim().required(messages.REQUIRED),
        })
        .required(messages.REQUIRED),

    contactNumber: yup.string().required(messages.REQUIRED),

    category: yup
        .string()
        .required(messages.REQUIRED)
        .oneOf(['VEG', 'NON_VEG'], 'Please select a valid restaurant category'),

    openingTime: yup.string().required(messages.REQUIRED),

    closingTime: yup.string().required(messages.REQUIRED),

    operatingDays: yup
        .array()
        .of(yup.string().required())
        .required(messages.REQUIRED)
        .min(1, 'Select at least one operating day'),
});

export type AddRestaurantFormValues = yup.InferType<typeof restaurantSchema>;
