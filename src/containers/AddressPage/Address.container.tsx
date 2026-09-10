import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Add as AddIcon,
    DeleteOutline as DeleteIcon,
    EditOutlined as EditIcon,
} from '@mui/icons-material';
import {
    CircularProgress,
    IconButton,
    Tooltip,
    Typography as MuiTypography,
    alpha,
} from '@mui/material';

import { Button } from '@components/Button';
import { TOAST_TYPES } from '@components/constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { showToast } from '@features/toast/toastSlice';
import { deleteAddress, getAllAddresses } from '@features/address/addressThunk';

import {
    AddressCard,
    AddressContent,
    AddressDetails,
    AddressHeader,
    AddressActions,
    EmptyState,
    HeaderContent,
    PageContainer,
    PageHeader,
} from './Address.styles';
import { ROUTES_SEGMENTS } from '@router/routes';
import { theme } from '@theme/index';
import { Name } from '@containers/CartPage/Cart.styles';

export const Address = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { addresses, isLoading } = useAppSelector((state) => state.address);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                await dispatch(getAllAddresses()).unwrap();
            } catch (error) {
                dispatch(
                    showToast({
                        type: TOAST_TYPES.ERROR,
                        title: 'Address Fetch Failed',
                        message: error as string,
                    }),
                );
            }
        };

        fetchAddresses();
    }, [dispatch]);

    const handleAddAddress = () => {
        navigate(ROUTES_SEGMENTS.ADDRESS.CREATE_ADDRESS);
    };

    const handleEditAddress = (addressId: string) => {
        navigate(
            ROUTES_SEGMENTS.ADDRESS.UPDATE_ADDRESS.replace(
                ':addressId',
                addressId,
            ),
        );
    };

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await dispatch(deleteAddress(addressId)).unwrap();
            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Address deleted successfully !!',
                }),
            );
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Address Deletion Failed',
                    message: error as string,
                }),
            );
        }
    };

    return (
        <PageContainer>
            <PageHeader>
                <HeaderContent>
                    <MuiTypography variant="h3">My ADDRESSES</MuiTypography>
                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Manage your saved addresses for a faster checkout
                        experience.
                    </MuiTypography>
                </HeaderContent>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddAddress}
                >
                    Add Address
                </Button>
            </PageHeader>

            {isLoading ? (
                <EmptyState>
                    <CircularProgress />
                </EmptyState>
            ) : (
                <AddressDetails>
                    {addresses.map((address) => (
                        <AddressCard key={address.id}>
                            <AddressContent>
                                <AddressHeader>
                                    <Name color="text.primary" variant="h6">
                                        {address.address_line_1}
                                    </Name>
                                </AddressHeader>

                                {address.address_line_2 && (
                                    <MuiTypography variant="body1">
                                        {address.address_line_2}
                                    </MuiTypography>
                                )}

                                <MuiTypography variant="body1">
                                    {address.city}, {address.state} -{' '}
                                    {address.postal_code}
                                </MuiTypography>

                                <MuiTypography variant="body1">
                                    {address.country}
                                </MuiTypography>
                            </AddressContent>

                            <AddressActions>
                                <Tooltip title="Edit Address">
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            handleEditAddress(address.id)
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete Address">
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            handleDeleteAddress(address.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </AddressActions>
                        </AddressCard>
                    ))}
                </AddressDetails>
            )}
        </PageContainer>
    );
};
