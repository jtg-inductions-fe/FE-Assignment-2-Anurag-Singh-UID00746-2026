import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth.service';

import { LoginCredential, SignupCredential } from './auth.types';
import { User } from '@types';

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
        return rejectWithValue((error as Error).message);
    }
});

/**
 * Asynchronous action that registers a new user profile inside the database.
 * Sends registration inputs to the authentication service and catches data conflicts.
 */
export const signup = createAsyncThunk<
    User,
    SignupCredential,
    { rejectValue: string }
>('auth/signup', async (credential: SignupCredential, { rejectWithValue }) => {
    try {
        return await authService.signup(credential);
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});
