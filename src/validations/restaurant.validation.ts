import * as yup from 'yup';

import { AddRestaurantFormValues } from '@containers/addRestaurant/addRestaurant.types';

export const restaurantSchema = yup.object({
    imageUrl: yup
        .string()
        .url('Enter a valid image URL')
        .required('Image URL is required'),

    name: yup
        .string()
        .trim()
        .required('Restaurant name is required')
        .min(3, 'Restaurant name must be at least 3 characters')
        .max(50, 'Restaurant name cannot exceed 50 characters'),

    description: yup
        .string()
        .trim()
        .required('Description is required')
        .max(250, 'Description cannot exceed 250 characters'),

    address: yup.string().trim().required('Address is required'),

    contactNumber: yup
        .string()
        .required('Contact number is required')
        .matches(/^[6-9]\d{9}$/, 'Enter a valid 10 digit mobile number'),

    category: yup.string().required('Food category is required'),

    openingTime: yup.string().required('Opening time is required'),

    closingTime: yup
        .string()
        .required('Closing time is required')
        .test(
            'closing-time',
            'Closing time must be after opening time',
            function (value) {
                const parentData = this.parent as AddRestaurantFormValues;
                const openingTime = parentData.openingTime;

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
