import {
    createAddress,
    deleteAddress,
    getAddressById,
    getAllAddresses,
    updateAddress,
} from '@api/auth.api';
import { Address, AddressRequest } from '@features/auth/auth.types';

export const addressService = {
    getAddressById: async (addressId: string): Promise<Address> => {
        return await getAddressById(addressId);
    },

    getAllAddresses: async (): Promise<Address[]> => {
        return await getAllAddresses();
    },

    createAddress: async (data: AddressRequest): Promise<void> => {
        await createAddress(data);
    },

    updateAddress: async (
        addressId: string,
        data: AddressRequest,
    ): Promise<void> => {
        await updateAddress(data, addressId);
    },

    deleteAddress: async (addressId: string): Promise<void> => {
        await deleteAddress(addressId);
    },
};
