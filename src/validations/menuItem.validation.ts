import * as yup from 'yup';
import { messages } from './constants';

export const menuItemSchema = yup.object({
    name: yup.string().trim().required(messages.REQUIRED),

    description: yup.string().trim().required(messages.REQUIRED),

    image: yup
        .string()
        .trim()
        .url('Enter a valid image URL')
        .required(messages.REQUIRED),

    price: yup
        .number()
        .typeError('Price is required')
        .positive('Price must be greater than 0')
        .required(messages.REQUIRED),

    stock: yup
        .number()
        .typeError('Stock is required')
        .integer('Stock must be a whole number')
        .min(0, 'Stock cannot be negative')
        .required(messages.REQUIRED),

    isVeg: yup.boolean().required(messages.REQUIRED),
});

export type MenuItemFormData = yup.InferType<typeof menuItemSchema>;
