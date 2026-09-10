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

import { ACTION_DIALOG_TYPES, TOAST_TYPES } from '@components/constants';
import { InputField } from '@components/InputField/InputField.component';
import { closeDialog } from '@features/feedback/feedbackSlice';
import {
    fetchRestaurantByIdThunk,
    updateRestaurantThunk,
} from '@features/restaurant/restaurantThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { normalizeTimeValue } from '@utils/getNormalizedTime';
import { restaurantSchema } from '@validations/restaurant.validation';

import { EditRestaurantFormValues } from './editRestaurant.types';

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

import { DAYS, DEFAULT_DAYS } from '@constant/index';

import { ActionDialog } from '@components/ActionDialog';
import { showDialog } from '@utils/openDialog';
import {
    FoodType,
    Restaurant,
    RestaurantUpdateRequest,
} from '@api/types/restaurant.types';

export const EditRestaurant = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { loading } = useAppSelector((state) => state.restaurant);

    const feedback = useAppSelector((state) => state.feedback);

    const [restaurantToEdit, setRestaurantToEdit] = useState<Restaurant | null>(
        null,
    );

    const [pendingFormData, setPendingFormData] =
        useState<EditRestaurantFormValues | null>(null);

    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<EditRestaurantFormValues>({
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

    /**
     * Fetches the restaurant directly by its ID when the edit page
     * is opened.
     *
     * Fetching the restaurant independently of the Redux restaurant
     * list ensures that the edit form continues to work after a
     * browser refresh or when the restaurant is not present in the
     * currently loaded paginated list.
     */
    useEffect(() => {
        if (!id) {
            return;
        }

        const loadRestaurant = async () => {
            try {
                const restaurant = await dispatch(
                    fetchRestaurantByIdThunk(id),
                ).unwrap();

                setRestaurantToEdit(restaurant);

                reset({
                    imageUrl: restaurant.image_url ?? '',

                    name: restaurant.name,

                    description: restaurant.description ?? '',

                    address: {
                        addressLine1: restaurant.address?.address_line_1 ?? '',

                        addressLine2: restaurant.address?.address_line_2 ?? '',

                        city: restaurant.address?.city ?? '',

                        state: restaurant.address?.state ?? '',

                        postalCode: restaurant.address?.postal_code ?? '',

                        country: restaurant.address?.country ?? '',
                    },

                    contactNumber:
                        restaurant.contact_number?.replace(/^tel:/, '') ?? '',

                    category: restaurant.type,

                    openingTime: normalizeTimeValue(restaurant.opening_time),

                    closingTime: normalizeTimeValue(restaurant.closing_time),

                    operatingDays: restaurant.working_days.map((day) =>
                        day.toString().toUpperCase(),
                    ),
                });
            } catch (error) {
                dispatch(
                    showToast({
                        type: TOAST_TYPES.ERROR,
                        title: 'Restaurant Not Found',
                        message: error as string,
                    }),
                );
            }
        };

        void loadRestaurant();
    }, [id, dispatch, reset]);

    const operatingDays = watch('operatingDays');

    /**
     * Saves the modified form data and opens the confirmation popup.
     *
     * The submitted form data is temporarily stored so that the
     * actual restaurant update is performed only after the user
     * confirms the action.
     *
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
     * Adds or removes a day from the operational calendar
     * schedule list.
     *
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
     * Submits the updated restaurant information to the backend
     * after the user confirms the changes.
     *
     * The frontend form values are converted from camelCase into
     * the backend RestaurantUpdateRequest structure.
     */
    const onSubmit = async () => {
        if (!pendingFormData) {
            return;
        }

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

        const payload: RestaurantUpdateRequest = {
            name: pendingFormData.name,

            image_url: pendingFormData.imageUrl || null,

            description: pendingFormData.description || null,

            contact_number: pendingFormData.contactNumber,

            opening_time: pendingFormData.openingTime,

            closing_time: pendingFormData.closingTime,

            working_days: pendingFormData.operatingDays.map(
                (day) =>
                    day.toUpperCase() as NonNullable<
                        RestaurantUpdateRequest['working_days']
                    >[number],
            ),

            type: pendingFormData.category as RestaurantUpdateRequest['type'],

            address: {
                address_line_1: pendingFormData.address.addressLine1,

                address_line_2: pendingFormData.address.addressLine2 || null,

                city: pendingFormData.address.city,

                state: pendingFormData.address.state,

                postal_code: pendingFormData.address.postalCode,

                country: pendingFormData.address.country,
            },
        };

        setIsSaving(true);

        try {
            await dispatch(
                updateRestaurantThunk({
                    restaurantId: restaurantToEdit.id,
                    data: payload,
                }),
            ).unwrap();

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Restaurant updated successfully !!',
                }),
            );

            reset();
            setPendingFormData(null);

            void navigate(ROUTES.ROOT);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Update Restaurant Failed',
                    message: error as string,
                }),
            );
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Closes the save changes confirmation popup and clears the
     * temporarily stored restaurant form data.
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
                                            disabled={isSaving}
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
                                            disabled={isSaving}
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
                                            disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                                        disabled={isSaving}
                                                        onChange={(event) => {
                                                            field.onChange(
                                                                event.target
                                                                    .value as FoodType,
                                                            );
                                                        }}
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
                                                            Select category
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
                                                disabled={isSaving}
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
                                                disabled={isSaving}
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
                                            disabled={isSaving}
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
                            disabled={isSaving}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<StorefrontOutlined />}
                            loading={loading || isSubmitting || isSaving}
                            disabled={isSaving}
                        >
                            {!loading &&
                                !isSubmitting &&
                                !isSaving &&
                                'Save changes'}
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
                onConfirm={onSubmit}
            />
        </Root>
    );
};
