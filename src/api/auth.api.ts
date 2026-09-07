import { Address, AddressRequest } from '@features/auth/auth.types';
import apiClient from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    role: string;
    address: {
        address_line_1: string;
        address_line_2?: string | null;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
}

export const login = async (data: LoginRequest): Promise<void> => {
    const formData = new URLSearchParams();

    formData.append('username', data.email);
    formData.append('password', data.password);

    await apiClient.post('/auth/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const register = async (data: RegisterRequest): Promise<void> => {
    await apiClient.post('/auth/register', data);
};

export const refreshAccessToken = async (): Promise<void> => {
    await apiClient.post('/auth/refresh');
};

export const logout = async (): Promise<void> => {
    await apiClient.post('/auth/logout');
};

export const getCurrentUser = async () => {
    const response = await apiClient.get('/auth/me');

    return response.data;
};

export const createAddress = async (data: AddressRequest): Promise<void> => {
    await apiClient.post('/address/create', data);
};

export const updateAddress = async (
    data: AddressRequest,
    addressId: string,
): Promise<void> => {
    await apiClient.patch(`/address/addresses/${addressId}`, data);
};

export const getAddressById = async (addressId: string): Promise<Address> => {
    const response = await apiClient.get(`/address/addresses/${addressId}`);

    return response.data;
};

export const getAllAddresses = async (): Promise<Address[]> => {
    const response = await apiClient.get('/address/addresses');

    return response.data;
};

export const deleteAddress = async (addressId: string): Promise<void> => {
    await apiClient.delete(`/address/addresses/${addressId}`);
};

export const updateUser = async (
    data: Partial<RegisterRequest>,
): Promise<void> => {
    await apiClient.patch('/auth/me', data);
};

export const deleteUser = async (): Promise<void> => {
    await apiClient.delete('auth/me');
};
