import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase('auth/login/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/login/fulfilled', (state, action: any) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/login/rejected', (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase('auth/signup/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/signup/fulfilled', (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/signup/rejected', (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase('auth/getCurrentUser/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/getCurrentUser/fulfilled', (state, action: any) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/getCurrentUser/rejected', (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/logout/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/logout/fulfilled', (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/logout/rejected', (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase('auth/updateUser/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/updateUser/fulfilled', (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/updateUser/rejected', (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase('auth/deleteUser/pending', (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase('auth/deleteUser/fulfilled', (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase('auth/deleteUser/rejected', (state, action: any) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            });
    },
});

export default authSlice.reducer;
