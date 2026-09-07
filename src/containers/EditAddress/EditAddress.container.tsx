import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
    alpha,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import { theme } from '@theme/index';

import { InputField } from '@components/InputField';
import { Button } from '@components/Button';
import { SignupForm, Wrapper } from '@containers/Signup/Signup.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '@validations/auth.validation';
import { AddressRequest } from '@features/auth/auth.types';
import { useAppDispatch } from '@store/hooks';
import { showToast } from '@features/toast/toastSlice';
import { TOAST_TYPES } from '@components/constants';
import { getAddressById, updateAddress } from '@features/address/addressThunk';
import { ROUTES_SEGMENTS } from '@router/routes';

export const EditAddress = () => {
    const { addressId } = useParams<{ addressId: string }>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const form = useForm<AddressRequest>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = form;

    useEffect(() => {
        if (!addressId) {
            return;
        }

        const fetchAddress = async () => {
            try {
                const address = await dispatch(
                    getAddressById(addressId),
                ).unwrap();

                reset({
                    address_line_1: address.address_line_1,
                    address_line_2: address.address_line_2 ?? '',
                    city: address.city,
                    state: address.state,
                    postal_code: address.postal_code,
                    country: address.country,
                });
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

        fetchAddress();
    }, [addressId, dispatch, reset]);

    const onSubmit = async (data: AddressRequest) => {
        if (!addressId) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Address Update Failed',
                    message: 'Address ID is missing.',
                }),
            );

            return;
        }

        try {
            await dispatch(
                updateAddress({
                    addressId,
                    data,
                }),
            ).unwrap();

            navigate(ROUTES_SEGMENTS.ADDRESS.VIEW_ADDRESSES);

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Address updated successfully !!',
                }),
            );
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Address Update Failed',
                    message: error as string,
                }),
            );
        }
    };

    return (
        <Wrapper>
            <SignupForm onSubmit={handleSubmit(onSubmit)}>
                <MuiStack spacing={10}>
                    <MuiStack spacing={1.5}>
                        <MuiTypography variant="h3" textAlign="center">
                            EDIT ADDRESS
                        </MuiTypography>

                        <MuiTypography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Please fill in the details below to edit your
                            address.
                        </MuiTypography>
                    </MuiStack>

                    <MuiStack spacing={6}>
                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Address Line 1
                            </MuiTypography>

                            <Controller
                                name="address_line_1"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter address line 1"
                                        fullWidth
                                        error={!!errors.address_line_1}
                                        helperText={
                                            errors.address_line_1?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Address Line 2
                            </MuiTypography>

                            <Controller
                                name="address_line_2"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter address line 2"
                                        fullWidth
                                        error={!!errors.address_line_2}
                                        helperText={
                                            errors.address_line_2?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">City</MuiTypography>

                            <Controller
                                name="city"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your city"
                                        fullWidth
                                        error={!!errors.city}
                                        helperText={errors.city?.message}
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">State</MuiTypography>

                            <Controller
                                name="state"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your state"
                                        fullWidth
                                        error={!!errors.state}
                                        helperText={errors.state?.message}
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Postal Code
                            </MuiTypography>

                            <Controller
                                name="postal_code"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your postal code"
                                        fullWidth
                                        error={!!errors.postal_code}
                                        helperText={errors.postal_code?.message}
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Country
                            </MuiTypography>

                            <Controller
                                name="country"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your country"
                                        fullWidth
                                        error={!!errors.country}
                                        helperText={errors.country?.message}
                                    />
                                )}
                            />
                        </MuiStack>
                    </MuiStack>

                    <MuiStack spacing={6}>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                        >
                            {!isSubmitting && 'Update Address'}
                        </Button>
                    </MuiStack>
                </MuiStack>
            </SignupForm>
        </Wrapper>
    );
};
