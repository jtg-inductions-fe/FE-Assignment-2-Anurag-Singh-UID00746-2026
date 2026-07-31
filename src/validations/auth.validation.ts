import * as yup from 'yup';

import { USER_ROLE, UserRole } from '../types/user.types';

const email = yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address');

const password = yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be atleast 6 characters');

export const loginSchema = yup.object().shape({
    email,
    password,
});

export const signupSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Full name is required')
        .min(3, 'Full name should contain atleast 3 characters')
        .max(30, 'Full name cannot be more than 30 characters'),
    email,
    password,
    confirmPassword: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    role: yup.mixed<UserRole>().oneOf(Object.values(USER_ROLE)),
});
