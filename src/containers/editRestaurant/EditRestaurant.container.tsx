import { ChangeEvent, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { StorefrontOutlined } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { alpha, Box, MenuItem, Stack, Typography } from '@mui/material';

import { ActionDialog } from '@components/ActionDialog/ActionDialog';
import { ACTION_DIALOG_TYPES, TOAST_TYPES } from '@components/constants';
import { InputField } from '@components/InputField/InputField.component';
import { DAYS, DEFAULT_DAYS, FOOD_CATEGORY, FoodCategory } from '@constant';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { updateRestaurantThunk } from '@features/restaurant/restaurantThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { normalizeTimeValue } from '@utils/getNormalizedTime';
import { restaurantSchema } from '@validations/restaurant.validation';

import { EditRestaurantFormValues } from './editRestaurant.types';
import { Restaurant } from '@types';
import { USER_ROLE } from '../../types/user.types';
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
} from '@containers/addRestaurant/AddRestaurant.styles';
import { Button } from '@components/Button';
import { Select } from '@components/BasicSelect';

const editRestaurantSchema = restaurantSchema.omit(['imageUrl']);

const EditRestaurant = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { user } = useAppSelector((state) => state.auth);
    const { loading, restaurants } = useAppSelector(
        (state) => state.restaurant,
    );
    const feedback = useAppSelector((state) => state.feedback);

    const [pendingFormData, setPendingFormData] =
        useState<EditRestaurantFormValues | null>(null);

    const restaurantToEdit = restaurants.find(
        (restaurant) => restaurant.id === id,
    );

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<EditRestaurantFormValues>({
        resolver: yupResolver(editRestaurantSchema),
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

    useEffect(() => {
        if (!restaurantToEdit) {
            return;
        }

        reset({
            imageUrl: restaurantToEdit.image,
            name: restaurantToEdit.name,
            description: restaurantToEdit.description,
            address: restaurantToEdit.address,
            contactNumber: restaurantToEdit.contactNumber ?? '',
            category: restaurantToEdit.category,
            openingTime: normalizeTimeValue(restaurantToEdit.openingTime),
            closingTime: normalizeTimeValue(restaurantToEdit.closingTime),
            operatingDays: Object.entries(restaurantToEdit.operatingDays ?? {})
                .filter(([, isSelected]) => isSelected)
                .map(([day]) => day.toUpperCase()),
        });
    }, [restaurantToEdit, reset]);

    const operatingDays = watch('operatingDays');

    /**
     * Saves the modified form data and opens the confirmation popup.
     * @param data - The edited restaurant form values.
     */
    const onSubmitForm = (data: EditRestaurantFormValues) => {
        setPendingFormData(data);
        dispatch(
            openDialog({
                title: 'SAVE CHANGES',
                description: 'Are you sure you want to save this changes ?',
                type: ACTION_DIALOG_TYPES.CONFIRM,
                confirmText: 'Save',
                cancelText: 'Cancel',
            }),
        );
    };

    /**
     * Adds or removes a day from the operational calendar schedule list.
     * @param day - The string name of the target day.
     */
    const handleDayToggle = (day: string) => {
        const nextOperatingDays = operatingDays.includes(day)
            ? operatingDays.filter((value) => value !== day)
            : [...operatingDays, day];

        setValue('operatingDays', nextOperatingDays, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    /**
     * Submits the updated restaurant configurations to the backend after user approval.
     * On success, clears the form inputs and redirects back to the home route.
     */
    const onSubmit = async () => {
        if (!pendingFormData) return;

        dispatch(closeDialog());

        if (!restaurantToEdit) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Restaurant Not Found',
                    message: 'Unable to find the restaurant to update.',
                }),
            );
            return;
        }

        const payload: Restaurant = {
            ...restaurantToEdit,
            ownerId: restaurantToEdit.ownerId || user?.id || USER_ROLE.GUEST,
            name: pendingFormData.name,
            description: pendingFormData.description,
            image: pendingFormData.imageUrl ?? restaurantToEdit.image,
            address: pendingFormData.address,
            contactNumber: pendingFormData.contactNumber,
            category: pendingFormData.category as FoodCategory,
            operatingDays: DEFAULT_DAYS.reduce(
                (acc, day) => {
                    const key =
                        day.toLowerCase() as keyof Restaurant['operatingDays'];

                    acc[key] = pendingFormData.operatingDays.includes(day);

                    return acc;
                },

                {} as Restaurant['operatingDays'],
            ),
            openingTime: pendingFormData.openingTime,
            closingTime: pendingFormData.closingTime,
            menuItems: restaurantToEdit.menuItems,
        };

        try {
            await dispatch(updateRestaurantThunk(payload)).unwrap();
            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Restaurant updated successfully !!',
                }),
            );
            reset();
            void navigate(ROUTES.ROOT);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Update Restaurant Failed',
                    message: error as string,
                }),
            );
        }
    };

    /**
     * Closes the save changes confirmation popup and drops the transient cache.
     */
    const handleCancelSubmit = () => {
        dispatch(closeDialog());
        setPendingFormData(null);
    };

    return (
        <Root>
            <Box
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
                    <Typography variant="h3">EDIT RESTAURANT</Typography>
                    <Typography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Update the restaurant details below and save the
                        changes.
                    </Typography>
                </HeadingWrapper>
                <FormContainer>
                    <FormGrid>
                        <MetaContainer>
                            <Stack spacing={2} width="100%">
                                <Typography variant="body1">
                                    Image URL
                                </Typography>
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
                            </Stack>
                            <Stack spacing={2} width="100%">
                                <Typography variant="body1">
                                    Restaurant name
                                </Typography>
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
                            </Stack>
                        </MetaContainer>
                        <Box width="100%">
                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    Restaurant description
                                </Typography>
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
                            </Stack>
                        </Box>
                        <FormGrid>
                            <MetaContainer>
                                <Stack spacing={2} width="100%">
                                    <Typography variant="body1">
                                        Address
                                    </Typography>
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
                                </Stack>
                                <Stack spacing={2} width="100%">
                                    <Typography variant="body1">
                                        Contact number
                                    </Typography>
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
                                </Stack>
                            </MetaContainer>
                            <RangeContainer>
                                <SelectFormControl>
                                    <Stack spacing={2} width="100%">
                                        <Typography variant="body1">
                                            Food category
                                        </Typography>
                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
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
                                                    <MenuItem
                                                        value={
                                                            FOOD_CATEGORY.BOTH
                                                        }
                                                    >
                                                        BOTH
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={
                                                            FOOD_CATEGORY.VEG
                                                        }
                                                    >
                                                        VEG
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={
                                                            FOOD_CATEGORY.NON_VEG
                                                        }
                                                    >
                                                        NON VEG
                                                    </MenuItem>
                                                </Select>
                                            )}
                                        />
                                    </Stack>
                                </SelectFormControl>
                                <TimeRangeContainer>
                                    <Stack spacing={2} width="100%">
                                        <Typography variant="body1">
                                            Opening time
                                        </Typography>
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
                                    </Stack>
                                    <Stack spacing={2} width="100%">
                                        <Typography variant="body1">
                                            Closing time
                                        </Typography>
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
                                    </Stack>
                                </TimeRangeContainer>
                            </RangeContainer>
                        </FormGrid>
                        <FormGrid>
                            <Stack spacing={2} width="100%">
                                <Typography variant="body1">
                                    Operating days
                                </Typography>
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
                                    <Typography
                                        color="error.main"
                                        variant="caption"
                                    >
                                        {errors.operatingDays.message}
                                    </Typography>
                                )}
                            </Stack>
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
                            {!loading && !isSubmitting && 'Save changes'}
                        </Button>
                    </ActionContainer>
                </FooterContainer>
            </Box>
            <ActionDialog
                open={feedback.open && Boolean(pendingFormData)}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                onClose={handleCancelSubmit}
                onConfirm={onSubmit}
            />
        </Root>
    );
};

export default EditRestaurant;
