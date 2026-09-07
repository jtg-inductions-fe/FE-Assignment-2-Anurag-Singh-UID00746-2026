import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LoginCredential, SignupCredential } from './auth.types';
import { User } from '@types';
import { authService } from '@services/auth.service';

/**
 * Asynchronous action that handles logging a user into the application.
 * Calls the authentication service API and handles catch errors if the credentials fail.
 */
export const login = createAsyncThunk<
    User,
    LoginCredential,
    { rejectValue: string }
>('auth/login', async (credential: LoginCredential, { rejectWithValue }) => {
    try {
        return await authService.login(credential);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.detail ?? error.message,
            );
        }

        return rejectWithValue((error as Error).message);
    }
});

/**
 * Asynchronous action that registers a new user profile inside the database.
 * Sends registration inputs to the authentication service and catches data conflicts.
 */
export const signup = createAsyncThunk<
    void,
    SignupCredential,
    { rejectValue: string }
>('auth/signup', async (credential: SignupCredential, { rejectWithValue }) => {
    try {
        await authService.signup(credential);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.detail ?? error.message,
            );
        }

        return rejectWithValue((error as Error).message);
    }
});

/**
 * Asynchronous action that retrieves the currently authenticated user.
 * Uses the authentication cookies to restore the user's session.
 */
export const getCurrentUser = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>('auth/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.detail ?? error.message,
            );
        }

        return rejectWithValue((error as Error).message);
    }
});

export const updateUser = createAsyncThunk<
    void,
    Partial<User>,
    { rejectValue: string }
>('auth/updateUser', async (data: Partial<User>, { rejectWithValue }) => {
    try {
        await authService.updateUser(data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.detail ?? error.message,
            );
        }

        return rejectWithValue((error as Error).message);
    }
});

/**
 * Asynchronous action that logs the currently authenticated user out.
 * Calls the authentication service to invalidate the current session.
 */
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.detail ?? error.message,
                );
            }

            return rejectWithValue((error as Error).message);
        }
    },
);

export const deleteUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/deleteUser',
    async (_, { rejectWithValue }) => {
        try {
            await authService.deleteUser();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.detail ?? error.message,
                );
            }

            return rejectWithValue((error as Error).message);
        }
    },
);
