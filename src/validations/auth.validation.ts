import * as yup from 'yup';

import { messages } from './constants';
import { UserRole } from '@types';
import { USER_ROLE } from '@components/constants';

const email = yup
    .string()
    .required(messages.REQUIRED)
    .email('Please enter a valid email address');

const password = yup
    .string()
    .required(messages.REQUIRED)
    .min(6, 'Password must be at least 6 characters');

export const loginSchema = yup.object().shape({
    email,
    password,
});

export const userSchema = yup.object().shape({
    name: yup
        .string()
        .required(messages.REQUIRED)
        .min(3, 'Name should contain at least 3 characters')
        .max(30, 'Name cannot be more than 30 characters'),
});

export type UserProfileData = yup.InferType<typeof userSchema>;

export const signupSchema = yup.object().shape({
    fullName: yup
        .string()
        .required(messages.REQUIRED)
        .min(3, 'Name should contain at least 3 characters')
        .max(30, 'Name cannot be more than 30 characters'),
    email,
    password,
    confirmPassword: yup
        .string()
        .required(messages.REQUIRED)
        .oneOf([yup.ref('password')], 'Passwords must match'),
    role: yup
        .mixed<UserRole>()
        .oneOf(Object.values(USER_ROLE) as UserRole[])
        .required(messages.REQUIRED),
    address: yup.object().shape({
        address_line_1: yup.string().required(messages.REQUIRED),
        address_line_2: yup.string().nullable(),
        city: yup.string().required(messages.REQUIRED),
        state: yup.string().required(messages.REQUIRED),
        postal_code: yup.string().required(messages.REQUIRED),
        country: yup.string().required(messages.REQUIRED),
    }),
});

export const addressSchema = yup.object().shape({
    address_line_1: yup.string().required(messages.REQUIRED),
    address_line_2: yup.string().nullable(),
    city: yup.string().required(messages.REQUIRED),
    state: yup.string().required(messages.REQUIRED),
    postal_code: yup.string().required(messages.REQUIRED),
    country: yup.string().required(messages.REQUIRED),
});
