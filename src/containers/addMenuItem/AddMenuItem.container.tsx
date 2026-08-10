import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { StorefrontOutlined } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { alpha, Box, MenuItem, Stack, Typography } from '@mui/material';

import { ActionDialog } from '@components/ActionDialog/ActionDialog';
import { MySelect } from '@components/BasicSelect/BasicSelect.component';
import MyButton from '@components/Button/Button';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
} from '@components/constants';
import ExceptionState from '@components/ExceptionState/ExceptionState';
import { MyInputField } from '@components/InputField/InputField.component';
import { FOOD_CATEGORY } from '@constant';
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
import { MenuItem as MenuItemType } from '../../types/menuItem.types';

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

    const handleCancelSubmit = () => {
        dispatch(closeDialog());
        setPendingFormData(null);
    };

    return (
        <Root>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmitForm)}
                width="100%"
            >
                <MyButton
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
                </MyButton>
                <HeadingWrapper>
                    <Typography variant="h3">ADD MENU ITEM</Typography>
                    <Typography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        Add a new item to our restaurant. Fill in the details
                        below.
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
                                    name="image"
                                    control={control}
                                    render={({ field }) => (
                                        <MyInputField
                                            {...field}
                                            placeholder="Paste your URL here"
                                            fullWidth
                                            error={!!errors.image}
                                            helperText={errors.image?.message}
                                        />
                                    )}
                                />
                            </Stack>
                            <Stack spacing={2} width="100%">
                                <Typography variant="body1">
                                    Item name
                                </Typography>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <MyInputField
                                            {...field}
                                            placeholder="Enter your item name"
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
                                    Item description
                                </Typography>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <MyInputField
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
                            </Stack>
                        </Box>
                        <FormGrid>
                            <MetaContainer>
                                <Stack spacing={2} width="100%">
                                    <Typography variant="body1">
                                        Price
                                    </Typography>
                                    <Controller
                                        name="price"
                                        control={control}
                                        render={({ field }) => (
                                            <MyInputField
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
                                </Stack>
                                <Stack spacing={2} width="100%">
                                    <Typography variant="body1">
                                        Quantity
                                    </Typography>
                                    <Controller
                                        name="stock"
                                        control={control}
                                        render={({ field }) => (
                                            <MyInputField
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
                                </Stack>
                            </MetaContainer>
                            <RangeContainer>
                                <SelectFormControl>
                                    <Stack spacing={2} width="100%">
                                        <Typography variant="body1">
                                            Food category
                                        </Typography>
                                        <Controller
                                            name="isVeg"
                                            control={control}
                                            render={({ field }) => (
                                                <MySelect
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
                                                </MySelect>
                                            )}
                                        />
                                        {errors.isVeg && (
                                            <Typography
                                                color="error.main"
                                                variant="caption"
                                            >
                                                {errors.isVeg.message}
                                            </Typography>
                                        )}
                                    </Stack>
                                </SelectFormControl>
                            </RangeContainer>
                        </FormGrid>
                    </FormGrid>
                </FormContainer>
                <FooterContainer>
                    <ActionContainer>
                        <MyButton
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={() => reset()}
                        >
                            Reset
                        </MyButton>

                        <MyButton
                            type="submit"
                            variant="contained"
                            startIcon={<StorefrontOutlined />}
                            loading={isSubmitting}
                        >
                            {!isSubmitting && 'Submit'}
                        </MyButton>
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
                onConfirm={handleConfirmSubmit}
            />
        </Root>
    );
};

export default AddMenuItem;
