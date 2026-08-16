import { ChangeEvent, useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { StorefrontOutlined } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
    alpha,
    Box as MuiBox,
    MenuItem as MuiMenuItem,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import {
    ACTION_DIALOG_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import { InputField } from '@components/InputField/InputField.component';
import { closeDialog } from '@features/feedback/feedbackSlice';
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
} from '@containers/AddRestaurant/AddRestaurant.styles';
import { Button } from '@components/Button';
import { Select } from '@components/BasicSelect';
import {
    DAYS,
    DEFAULT_DAYS,
    FOOD_CATEGORY,
    FoodCategory,
} from '@constant/index';
import { ActionDialog } from '@components/ActionDialog';
import { showDialog } from '@utils/openDialog';
import { convertTo12Hour } from '@utils/convertTo12Hour';

const editRestaurantSchema = restaurantSchema.omit(['imageUrl']);

export const EditRestaurant = () => {
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

    const form = useForm<EditRestaurantFormValues>({
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

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = form;

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
        showDialog(
            {
                title: 'SAVE CHANGES',
                description: 'Are you sure you want to save this changes ?',
                type: ACTION_DIALOG_TYPES.CONFIRM,
                confirmText: 'Save',
                cancelText: 'Cancel',
            },
            dispatch,
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
            openingTime: convertTo12Hour(pendingFormData.openingTime),
            closingTime: convertTo12Hour(pendingFormData.closingTime),
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
                    <MuiTypography variant="h3">EDIT RESTAURANT</MuiTypography>
                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Update the restaurant details below and save the
                        changes.
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
                                                </Select>
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
                            {!loading && !isSubmitting && 'Save changes'}
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
                cancelButtonConfig={{ color: 'error', variant: 'outlined' }}
                confirmButtonConfig={{ color: 'primary', variant: 'contained' }}
                onClose={handleCancelSubmit}
                onConfirm={onSubmit}
            />
        </Root>
    );
};
