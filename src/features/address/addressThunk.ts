import { Address, AddressRequest } from '@features/auth/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addressService } from '@services/address.service';

export const createAddress = createAsyncThunk<
    void,
    AddressRequest,
    { rejectValue: string }
>('address/create', async (data: AddressRequest, { rejectWithValue }) => {
    try {
        await addressService.createAddress(data);
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const updateAddress = createAsyncThunk<
    void,
    { addressId: string; data: AddressRequest },
    { rejectValue: string }
>('address/update', async ({ addressId, data }, { rejectWithValue }) => {
    try {
        await addressService.updateAddress(addressId, data);
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const getAddressById = createAsyncThunk<
    Address,
    string,
    { rejectValue: string }
>('address/getById', async (addressId, { rejectWithValue }) => {
    try {
        const address = await addressService.getAddressById(addressId);
        return address;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const getAllAddresses = createAsyncThunk<
    Address[],
    void,
    { rejectValue: string }
>('address/getAll', async (_, { rejectWithValue }) => {
    try {
        const addresses = await addressService.getAllAddresses();
        return addresses;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});

export const deleteAddress = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>('address/delete', async (addressId, { rejectWithValue }) => {
    try {
        await addressService.deleteAddress(addressId);
        return addressId;
    } catch (error) {
        return rejectWithValue((error as Error).message);
    }
});
