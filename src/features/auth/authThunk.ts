import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@services/auth.service';

import { LoginCredential, SignupCredential } from './auth.types';
import { User } from '@types';

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
