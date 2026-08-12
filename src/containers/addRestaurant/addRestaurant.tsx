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
import { MySelect } from '@components/BasicSelect/BasicSelect';
import { showToast } from '@features/toast/toastSlice';
import { addRestaurantThunk } from '@features/restaurant/restaurantThunk';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import {
    DAYS,
    DEFAULT_DAYS,
    FOOD_CATEGORY,
    FoodCategory,
} from '@constant/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { restaurantSchema } from '@validations/restaurant.validation';
import { ROUTES } from '@router/routes';

import { Restaurant } from '../../types/restaurant.types';
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
    Root,
    SelectFormControl,
    TimeRangeContainer,
} from './addRestaurant.styles';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { AddRestaurantFormValues } from './addRestaurant.types';
import { nanoid } from '@reduxjs/toolkit';

const AddRestaurant = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { loading } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);

    const [pendingFormData, setPendingFormData] =
        useState<AddRestaurantFormValues | null>(null);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AddRestaurantFormValues>({
        resolver: yupResolver(restaurantSchema),
        defaultValues: {
            imageUrl: '',
            name: '',
            description: '',
            address: '',
            contactNumber: '',
            category: '',
            openingTime: '',
            closingTime: '',
            operatingDays: DEFAULT_DAYS,
        },
    });

    const operatingDays = watch('operatingDays');

    const handleDayToggle = (day: string) => {
        const nextOperatingDays = operatingDays.includes(day)
            ? operatingDays.filter((value) => value !== day)
            : [...operatingDays, day];

        setValue('operatingDays', nextOperatingDays, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmitForm = (data: AddRestaurantFormValues) => {
        setPendingFormData(data);
        dispatch(
            openDialog({
                title: 'ADD RESTAURANT',
                description: 'Are you sure you want to add this restaurant ?',
                type: ACTION_DIALOG_TYPES.CONFIRM,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            }),
        );
    };

    const handleConfirmSubmit = async () => {
        if (!pendingFormData) return;

        dispatch(closeDialog());

        const payload: Restaurant = {
            id: nanoid(),
            ownerId: user?.id ?? 'guest-user',
            name: pendingFormData.name,
            description: pendingFormData.description,
            image: pendingFormData.imageUrl,
            address: pendingFormData.address,
            contactNumber: pendingFormData.contactNumber,
            category: pendingFormData.category as FoodCategory,
            isOpenToday: true,
            operatingDays: DAYS.reduce(
                (acc, { value }) => {
                    const key =
                        value.toLowerCase() as keyof Restaurant['operatingDays'];
                    acc[key] = pendingFormData.operatingDays.includes(value);

                    return acc;
                },
                {} as Restaurant['operatingDays'],
            ),
            openingTime: pendingFormData.openingTime,
            closingTime: pendingFormData.closingTime,
            menuItems: [],
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

    const handleCancelSubmit = () => {
        dispatch(closeDialog());
        setPendingFormData(null);
    };

    return (
        <Root>
            <MuiBox
                component="form"
                onSubmit={(event: ChangeEvent<HTMLFormElement>) =>
                    void handleSubmit(onSubmitForm)(event)
                }
                width="100%"
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
                                        Address
                                    </MuiTypography>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                placeholder="Enter address of your restaurant"
                                                fullWidth
                                                error={!!errors.address}
                                                helperText={
                                                    errors.address?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
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
                            </MetaContainer>
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
                                                <MySelect
                                                    {...field}
                                                    value={field.value}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target.value,
                                                        )
                                                    }
                                                    displayEmpty
                                                    fullWidth
                                                    error={!!errors.category}
                                                >
                                                    <MuiMenuItem
                                                        value=""
                                                        disabled
                                                    >
                                                        Select Category
                                                    </MuiMenuItem>
                                                    <MuiMenuItem
                                                        value={
                                                            FOOD_CATEGORY.BOTH
                                                        }
                                                    >
                                                        BOTH
                                                    </MuiMenuItem>
                                                    <MuiMenuItem
                                                        value={
                                                            FOOD_CATEGORY.VEG
                                                        }
                                                    >
                                                        VEG
                                                    </MuiMenuItem>
                                                    <MuiMenuItem
                                                        value={
                                                            FOOD_CATEGORY.NON_VEG
                                                        }
                                                    >
                                                        NON VEG
                                                    </MuiMenuItem>
                                                </MySelect>
                                            )}
                                        />
                                    </MuiStack>
                                </SelectFormControl>
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
                                                        errors.openingTime
                                                            ?.message
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
                                                        errors.closingTime
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    </MuiStack>
                                </TimeRangeContainer>
                            </RangeContainer>
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
            </MuiBox>
            <ActionDialog
                open={feedback.open && Boolean(pendingFormData)}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                cancelButtonConfig={{ color: 'error', variant: 'outlined' }}
                confirmButtonConfig={{ color: 'primary', variant: 'contained' }}
                onClose={handleCancelSubmit}
                onConfirm={handleConfirmSubmit}
            />
        </Root>
    );
};

export default AddRestaurant;
