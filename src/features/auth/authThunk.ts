import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoginCredential } from './auth.types';
import { authService } from '../../services/auth.service';
import { User } from '../../types/user.types';

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
