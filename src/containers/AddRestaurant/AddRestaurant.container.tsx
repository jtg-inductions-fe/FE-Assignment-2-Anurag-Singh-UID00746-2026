import { ChangeEvent, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { StorefrontOutlined } from '@mui/icons-material';
import {
    alpha,
    Box as MuiBox,
    MenuItem as MuiMenuItem,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ACTION_DIALOG_TYPES, TOAST_TYPES } from '@components/constants';
import { closeDialog } from '@features/feedback/feedbackSlice';
import { addRestaurantThunk } from '@features/restaurant/restaurantThunk';
import { showToast } from '@features/toast/toastSlice';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { DAYS, DEFAULT_DAYS } from '@constant/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { restaurantSchema } from '@validations/restaurant.validation';

import {
    ActionContainer,
    FooterContainer,
    FormContainer,
    FormGrid,
    HeadingWrapper,
    MetaContainer,
    OperatingDayChip,
    OperatingDaysContainer,
    RangeContainer,
    RestaurantForm,
    Root,
    SelectFormControl,
    TimeRangeContainer,
} from './AddRestaurant.styles';
import { AddRestaurantFormValues } from './addRestaurant.types';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import { Select } from '@components/BasicSelect';
import { ActionDialog } from '@components/ActionDialog';
import { showDialog } from '@utils/openDialog';
import { messages } from '@validations/constants';
import { FoodType, RestaurantRequest } from '@api/types/restaurant.types';

export const AddRestaurant = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);

    const [pendingFormData, setPendingFormData] =
        useState<AddRestaurantFormValues | null>(null);

    const form = useForm<AddRestaurantFormValues>({
        resolver: yupResolver(restaurantSchema),
        defaultValues: {
            imageUrl: '',
            name: '',
            description: '',
            address: {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
            },
            contactNumber: '',
            category: '',
            openingTime: '',
            closingTime: '',
            operatingDays: DEFAULT_DAYS,
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = form;

    const operatingDays = watch('operatingDays');

    /**
     * Adds or removes a day from the active operational days list.
     * Updates the form validation state dynamically.
     * @param day - The string name of the target day.
     */
    const handleDayToggle = (day: string) => {
        const nextOperatingDays = operatingDays.includes(day)
            ? operatingDays.filter((value) => value !== day)
            : [...operatingDays, day];

        setValue('operatingDays', nextOperatingDays, {
            shouldValidate: true,
        });
    };

    /**
     * Saves the restaurant form data and opens the confirmation popup.
     * @param data - The filled-out restaurant form data.
     */
    const onSubmitForm = (data: AddRestaurantFormValues) => {
        setPendingFormData(data);

        showDialog(
            {
                title: 'ADD RESTAURANT',
                description: 'Are you sure you want to add this restaurant ?',
                type: ACTION_DIALOG_TYPES.CONFIRM,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            },
            dispatch,
        );
    };

    /**
     * Creates a new restaurant after the user confirms the submitted form.
     *
     * The form values are converted into the backend RestaurantRequest
     * structure before being sent through the Redux thunk.
     *
     * On successful creation, the restaurant is added to the Redux store,
     * the form is reset, a success message is displayed, and the user
     * is redirected to the restaurant listing page.
     */
    const handleConfirmSubmit = async () => {
        if (!pendingFormData) {
            return;
        }

        dispatch(closeDialog());

        const payload: RestaurantRequest = {
            name: pendingFormData.name,
            image_url: pendingFormData.imageUrl || null,
            description: pendingFormData.description || null,
            contact_number: pendingFormData.contactNumber,
            opening_time: pendingFormData.openingTime,
            closing_time: pendingFormData.closingTime,
            working_days: pendingFormData.operatingDays.map(
                (day) =>
                    day.toUpperCase() as RestaurantRequest['working_days'][number],
            ),
            type: pendingFormData.category as FoodType,
            cuisine: pendingFormData.category,

            address: {
                address_line_1: pendingFormData.address.addressLine1,

                address_line_2: pendingFormData.address.addressLine2 || null,

                city: pendingFormData.address.city,

                state: pendingFormData.address.state,

                postal_code: pendingFormData.address.postalCode,

                country: pendingFormData.address.country,
            },
        };

        try {
            await dispatch(addRestaurantThunk(payload)).unwrap();

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Restaurant added successfully !!',
                }),
            );

            reset();
            setPendingFormData(null);

            void navigate(ROUTES.ROOT);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Add Restaurant Failed',
                    message: error as string,
                }),
            );
        }
    };

    /**
     * Closes the confirmation popup box and clears the temporarily
     * stored restaurant form data.
     */
    const handleCancelSubmit = () => {
        dispatch(closeDialog());
        setPendingFormData(null);
    };

    return (
        <Root>
            <RestaurantForm
                onSubmit={(event: ChangeEvent<HTMLFormElement>) =>
                    void handleSubmit(onSubmitForm)(event)
                }
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => void navigate(ROUTES.ROOT)}
                >
                    Back
                </Button>

                <HeadingWrapper>
                    <MuiTypography variant="h3">ADD RESTAURANT</MuiTypography>

                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Add a new restaurant to our platform. Fill in the
                        details below.
                    </MuiTypography>
                </HeadingWrapper>

                <FormContainer>
                    <FormGrid>
                        <MetaContainer>
                            <MuiStack spacing={2} width="100%">
                                <MuiTypography variant="body1">
                                    Image URL
                                </MuiTypography>

                                <Controller
                                    name="imageUrl"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Paste your URL here"
                                            fullWidth
                                            error={!!errors.imageUrl}
                                            helperText={
                                                errors.imageUrl?.message
                                            }
                                        />
                                    )}
                                />
                            </MuiStack>

                            <MuiStack spacing={2} width="100%">
                                <MuiTypography variant="body1">
                                    Restaurant name
                                </MuiTypography>

                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Enter your restaurant name"
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </MuiStack>
                        </MetaContainer>

                        <MuiBox width="100%">
                            <MuiStack spacing={2}>
                                <MuiTypography variant="body1">
                                    Restaurant description
                                </MuiTypography>

                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Enter your restaurant description"
                                            fullWidth
                                            multiline
                                            rows={5}
                                            error={!!errors.description}
                                            helperText={
                                                errors.description?.message
                                            }
                                        />
                                    )}
                                />
                            </MuiStack>
                        </MuiBox>

                        <FormGrid>
                            <MetaContainer>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Address Line 1
                                    </MuiTypography>

                                    <Controller
                                        name="address.addressLine1"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter address line 1"
                                                fullWidth
                                                error={
                                                    !!errors.address
                                                        ?.addressLine1
                                                }
                                                helperText={
                                                    errors.address?.addressLine1
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>

                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Address Line 2
                                    </MuiTypography>

                                    <Controller
                                        name="address.addressLine2"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter address line 2"
                                                fullWidth
                                                error={
                                                    !!errors.address
                                                        ?.addressLine2
                                                }
                                                helperText={
                                                    errors.address?.addressLine2
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
                            </MetaContainer>

                            <MetaContainer>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        City
                                    </MuiTypography>

                                    <Controller
                                        name="address.city"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter city"
                                                fullWidth
                                                error={!!errors.address?.city}
                                                helperText={
                                                    errors.address?.city
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>

                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        State
                                    </MuiTypography>

                                    <Controller
                                        name="address.state"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter state"
                                                fullWidth
                                                error={!!errors.address?.state}
                                                helperText={
                                                    errors.address?.state
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
                            </MetaContainer>

                            <MetaContainer>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Postal Code
                                    </MuiTypography>

                                    <Controller
                                        name="address.postalCode"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter postal code"
                                                fullWidth
                                                error={
                                                    !!errors.address?.postalCode
                                                }
                                                helperText={
                                                    errors.address?.postalCode
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>

                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Country
                                    </MuiTypography>

                                    <Controller
                                        name="address.country"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter country"
                                                fullWidth
                                                error={
                                                    !!errors.address?.country
                                                }
                                                helperText={
                                                    errors.address?.country
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
                            </MetaContainer>

                            <MetaContainer>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Contact number
                                    </MuiTypography>

                                    <Controller
                                        name="contactNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter contact number"
                                                fullWidth
                                                error={!!errors.contactNumber}
                                                helperText={
                                                    errors.contactNumber
                                                        ?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>

                                <RangeContainer>
                                    <SelectFormControl>
                                        <MuiStack spacing={2} width="100%">
                                            <MuiTypography variant="body1">
                                                Food category
                                            </MuiTypography>

                                            <Controller
                                                name="category"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        value={field.value}
                                                        onChange={(event) =>
                                                            field.onChange(
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        displayEmpty
                                                        fullWidth
                                                        error={
                                                            !!errors.category
                                                        }
                                                    >
                                                        <MuiMenuItem
                                                            value=""
                                                            disabled
                                                        >
                                                            Select Category
                                                        </MuiMenuItem>

                                                        <MuiMenuItem value="VEG">
                                                            VEG
                                                        </MuiMenuItem>

                                                        <MuiMenuItem value="NON_VEG">
                                                            NON VEG
                                                        </MuiMenuItem>
                                                    </Select>
                                                )}
                                            />

                                            {errors.category && (
                                                <MuiTypography color="error">
                                                    {messages.REQUIRED}
                                                </MuiTypography>
                                            )}
                                        </MuiStack>
                                    </SelectFormControl>
                                </RangeContainer>
                            </MetaContainer>

                            <TimeRangeContainer>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Opening time
                                    </MuiTypography>

                                    <Controller
                                        name="openingTime"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                type="time"
                                                fullWidth
                                                error={!!errors.openingTime}
                                                helperText={
                                                    errors.openingTime?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>

                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Closing time
                                    </MuiTypography>

                                    <Controller
                                        name="closingTime"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                type="time"
                                                fullWidth
                                                error={!!errors.closingTime}
                                                helperText={
                                                    errors.closingTime?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
                            </TimeRangeContainer>
                        </FormGrid>

                        <FormGrid>
                            <MuiStack spacing={2} width="100%">
                                <MuiTypography variant="body1">
                                    Operating days
                                </MuiTypography>

                                <OperatingDaysContainer>
                                    {DAYS.map((day) => (
                                        <OperatingDayChip
                                            key={day.value}
                                            selected={operatingDays.includes(
                                                day.value,
                                            )}
                                            onClick={() =>
                                                handleDayToggle(day.value)
                                            }
                                        >
                                            {day.label}
                                        </OperatingDayChip>
                                    ))}
                                </OperatingDaysContainer>

                                {errors.operatingDays && (
                                    <MuiTypography
                                        color="error.main"
                                        variant="caption"
                                    >
                                        {errors.operatingDays.message}
                                    </MuiTypography>
                                )}
                            </MuiStack>
                        </FormGrid>
                    </FormGrid>
                </FormContainer>

                <FooterContainer>
                    <ActionContainer>
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={() => reset()}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<StorefrontOutlined />}
                            loading={loading || isSubmitting}
                        >
                            {!loading && !isSubmitting && 'Submit'}
                        </Button>
                    </ActionContainer>
                </FooterContainer>
            </RestaurantForm>

            <ActionDialog
                open={feedback.open && Boolean(pendingFormData)}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                cancelButtonConfig={{
                    color: 'error',
                    variant: 'outlined',
                }}
                confirmButtonConfig={{
                    color: 'primary',
                    variant: 'contained',
                }}
                onClose={handleCancelSubmit}
                onConfirm={handleConfirmSubmit}
            />
        </Root>
    );
};
