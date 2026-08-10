import * as yup from 'yup';

import { UserRole } from '../types/user.types';
import { USER_ROLE } from '@components/constants';

const email = yup
    .string()
    .required('This field is required')
    .email('Please enter a valid email address');

const password = yup
    .string()
    .required('This field is required')
    .min(6, 'Password must be at least 6 characters');

export const loginSchema = yup.object().shape({
    email,
    password,
});

export const signupSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('This field is required')
        .min(3, 'Full name should contain at least 3 characters')
        .max(30, 'Full name cannot be more than 30 characters'),
    email,
    password,
    confirmPassword: yup
        .string()
        .required('This field is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    role: yup.mixed<UserRole>().oneOf(Object.values(USER_ROLE)),
});
