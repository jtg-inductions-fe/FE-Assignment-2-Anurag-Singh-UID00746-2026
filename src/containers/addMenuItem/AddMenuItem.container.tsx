import { useState } from 'react';

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
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
} from '@components/constants';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { addMenuItemThunk } from '@features/restaurant/restaurantThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { nanoid } from '@reduxjs/toolkit';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import {
    MenuItemFormData,
    menuItemSchema,
} from '@validations/menuItem.validation';

import {
    ActionContainer,
    FooterContainer,
    FormContainer,
    FormGrid,
    HeadingWrapper,
    MetaContainer,
    RangeContainer,
    Root,
    SelectFormControl,
} from './AddMenuItem.styles';
import { MenuItem as MenuItemType } from '@types';
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import { Select } from '@components/BasicSelect';
import { FOOD_CATEGORY } from '@constant/index';
import { ActionDialog } from '@components/ActionDialog';

const AddMenuItem = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MenuItemFormData>({
        resolver: yupResolver(menuItemSchema),
        defaultValues: {
            image: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            isVeg: true,
        },
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { restaurants } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);

    const [pendingFormData, setPendingFormData] =
        useState<MenuItemFormData | null>(null);

    const { id } = useParams<{ id: string }>();

    useSearchRestaurants();

    const restaurant = restaurants.find((item) => item.id === id);

    if (!restaurant) {
        return (
            <ExceptionState
                type={EXCEPTION_STATE_TYPES.EMPTY}
                title="Restaurant not found"
                description="We couldn't find the restaurant you are looking for."
            />
        );
    }

    /**
     * Saves the form data and opens the confirmation dialog box.
     * @param data - The filled-out menu item form data.
     */
    const onSubmitForm = (data: MenuItemFormData) => {
        setPendingFormData(data);
        dispatch(
            openDialog({
                title: 'ADD MENU ITEM',
                description: 'Are you sure you want to add this menu item ?',
                type: ACTION_DIALOG_TYPES.CONFIRM,
                confirmText: 'Confirm',
                cancelText: 'Cancel',
            }),
        );
    };

    /**
     * Submits the menu item to the backend after the user clicks confirm.
     * On success, shows a notification and takes the user back to the restaurant page.
     */
    const handleConfirmSubmit = async () => {
        if (!pendingFormData) return;

        dispatch(closeDialog());

        const menuItem: MenuItemType = {
            id: nanoid(),
            name: pendingFormData.name,
            description: pendingFormData.description,
            image: pendingFormData.image,
            price: Number(pendingFormData.price),
            stock: Number(pendingFormData.stock),
            isVeg: pendingFormData.isVeg,
        };

        try {
            await dispatch(
                addMenuItemThunk({
                    restaurantId: id!,
                    menuItem,
                }),
            ).unwrap();

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Menu item added successfully !!',
                }),
            );
            setPendingFormData(null);
            void navigate(
                ROUTES.RESTAURANTS.RESTAURANT_DETAILS.replace(':id', id!),
            );
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Add Menu Item Failed',
                    message: error as string,
                }),
            );
        }
    };

    /**
     * Closes the confirmation dialog and clears the saved form data.
     */
    const handleCancelSubmit = () => {
        dispatch(closeDialog());
        setPendingFormData(null);
    };

    return (
        <Root>
            <MuiBox
                component="form"
                onSubmit={handleSubmit(onSubmitForm)}
                width="100%"
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() =>
                        void navigate(
                            ROUTES.RESTAURANTS.RESTAURANT_DETAILS.replace(
                                ':id',
                                id!,
                            ),
                        )
                    }
                >
                    Back
                </Button>
                <HeadingWrapper>
                    <MuiTypography variant="h3">ADD MENU ITEM</MuiTypography>
                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Add a new item to our restaurant. Fill in the details
                        below.
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
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Paste your URL here"
                                            fullWidth
                                            error={!!errors.image}
                                            helperText={errors.image?.message}
                                        />
                                    )}
                                />
                            </MuiStack>
                            <MuiStack spacing={2} width="100%">
                                <MuiTypography variant="body1">
                                    Item name
                                </MuiTypography>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Enter your item name"
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
                                    Item description
                                </MuiTypography>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            placeholder="Enter your item description"
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
                                        Price
                                    </MuiTypography>
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                type="number"
                                                placeholder="Enter price of your item"
                                                fullWidth
                                                error={!!errors.price}
                                                helperText={
                                                    errors.price?.message
                                                }
                                            />
                                        )}
                                    />
                                </MuiStack>
                                <MuiStack spacing={2} width="100%">
                                    <MuiTypography variant="body1">
                                        Quantity
                                    </MuiTypography>
                                    <Controller
                                        name="stock"
                                        control={control}
                                        render={({ field }) => (
                                            <InputField
                                                {...field}
                                                type="number"
                                                placeholder="Enter available quantity"
                                                fullWidth
                                                error={!!errors.stock}
                                                helperText={
                                                    errors.stock?.message
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
                                            name="isVeg"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={
                                                        field.value
                                                            ? FOOD_CATEGORY.VEG
                                                            : FOOD_CATEGORY.NON_VEG
                                                    }
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            event.target
                                                                .value ===
                                                                FOOD_CATEGORY.VEG,
                                                        )
                                                    }
                                                    displayEmpty
                                                    fullWidth
                                                    error={!!errors.isVeg}
                                                >
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
                                        {errors.isVeg && (
                                            <MuiTypography
                                                color="error.main"
                                                variant="caption"
                                            >
                                                {errors.isVeg.message}
                                            </MuiTypography>
                                        )}
                                    </MuiStack>
                                </SelectFormControl>
                            </RangeContainer>
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
                            loading={isSubmitting}
                        >
                            {!isSubmitting && 'Submit'}
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

export default AddMenuItem;
