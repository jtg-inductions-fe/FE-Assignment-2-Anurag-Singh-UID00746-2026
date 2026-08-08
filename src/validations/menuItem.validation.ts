import * as yup from 'yup';

export const menuItemSchema = yup.object({
    name: yup.string().trim().required('Item name is required'),

    description: yup.string().trim().required('Description is required'),

    image: yup
        .string()
        .trim()
        .url('Enter a valid image URL')
        .required('Image URL is required'),

    price: yup
        .number()
        .typeError('Price is required')
        .positive('Price must be greater than 0')
        .required('Price is required'),

    stock: yup
        .number()
        .typeError('Stock is required')
        .integer('Stock must be a whole number')
        .min(0, 'Stock cannot be negative')
        .required('Stock is required'),

    isVeg: yup.boolean().required('Category is required'),
});

export type MenuItemFormData = yup.InferType<typeof menuItemSchema>;
