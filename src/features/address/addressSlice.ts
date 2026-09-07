import { createSlice } from '@reduxjs/toolkit';

import {
    createAddress,
    deleteAddress,
    getAllAddresses,
    updateAddress,
} from './addressThunk';
import { Address } from '@features/auth/auth.types';

interface AddressState {
    addresses: Address[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AddressState = {
    addresses: [],
    isLoading: false,
    error: null,
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createAddress.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase(getAllAddresses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAllAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            })
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(
                    (addr) => addr.id !== action.payload,
                );
                state.isLoading = false;
                state.error = null;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Something went wrong';
            });
    },
});

export default addressSlice.reducer;
