import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import { alpha, Box, Grid2, Link, Stack, Typography } from '@mui/material';

import { ActionDialog } from '@components/ActionDialog/ActionDialog';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
} from '@components/constants';
import MenuItemCard from '@containers/MenuItemCard/MenuItemCard.container';
import { Permission } from '@config/permissions';
import { rolePermissions } from '@config/rolePermissions';
import { addToCart } from '@features/cart/cartSlice';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { deleteMenuItemThunk } from '@features/restaurant/restaurantThunk';
import { showToast } from '@features/toast/toastSlice';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';

import {
    ContactWrapper,
    CustomDivider,
    HeaderContent,
    HeaderWrapper,
    TimingChip,
} from './Restaurant.styles';
import { MenuItem } from '@types';
import { USER_ROLE } from '../../types/user.types';
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';

const Restaurant = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { user } = useAppSelector((state) => state.auth);
    const { restaurants, error } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);
    const dispatch = useAppDispatch();

    const [selectedQuantity, setSelectedQuantity] = useState<
        Record<string, number>
    >({});

    const [itemtToDelete, setItemToDelete] = useState<MenuItem | undefined>(
        undefined,
    );

    useSearchRestaurants();

    const userRole = user?.role;
    const restaurant = restaurants.find((item) => item.id === id);

    const permissions = rolePermissions[userRole || USER_ROLE.GUEST];

    if (error) {
        return (
            <ExceptionState
                type={EXCEPTION_STATE_TYPES.ERROR}
                title="Something went wrong"
                description={error}
            />
        );
    }

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
     * Adds a chosen menu item to the cart state with its selected quantity value.
     * Triggers a success toast alert message and resets the local selection counter to zero.
     * @param item - The selected menu item object payload to inject.
     */
    const handleAddToCart = (item: MenuItem) => {
        dispatch(
            addToCart({
                ...item,
                restaurantId: restaurant.id,
                quantity: selectedQuantity[item.id] ?? 1,
            }),
        );
        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: `Added [${item.name}] to your cart !!`,
            }),
        );

        setSelectedQuantity((prev) => ({
            ...prev,
            [item.id]: 0,
        }));
    };

    /**
     * Dispatches the asynchronous backend network deletion operation hook for the cached targeted menu item.
     */
    const handleConfirmDelete = () => {
        if (itemtToDelete) {
            dispatch(
                deleteMenuItemThunk({
                    restaurantId: restaurant.id,
                    menuItemId: itemtToDelete.id,
                }),
            );
        }

        handleCloseDialog();
    };

    /**
     * Navigates the application dashboard layout screen directly to the item edit workspace panel form.
     * @param item - The menu item targeted for property adjustment modifications.
     */
    const handleEditMenuItem = (item: MenuItem) => {
        void navigate(
            ROUTES.MENU_ITEMS.EDIT_MENU_ITEM.replace(
                ':id',
                restaurant.id,
            ).replace(':menuItemId', item.id),
        );
    };

    /**
     * Redirects the viewport window view straight into the restaurant menu creation input portal form.
     */
    const handleAddMenuItem = () => {
        void navigate(
            ROUTES.MENU_ITEMS.ADD_MENU_ITEM.replace(':id', restaurant.id),
        );
    };

    /**
     * Closes the interactive overlay popup modal layout panel and clears the transient target delete state cache.
     */
    const handleCloseDialog = () => {
        dispatch(closeDialog());
        setItemToDelete(undefined);
    };

    /**
     * Stashes the target menu item data into local context state memory and invokes the confirmation modal popup display overlay.
     * @param item - The selected item object profile slated for full deletion removal.
     */
    const handleDeleteItem = (item: MenuItem) => {
        setItemToDelete(item);
        dispatch(
            openDialog({
                title: `DELETE ${item.name} ?`,
                description: `Are you sure you want to delete ${item.name} from your restaurant ?`,
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Delete',
                cancelText: 'Cancel',
            }),
        );
    };

    /**
     * Generates a sorted clone array from the primary restaurant dataset catalog context tree list.
     * Positions all available in stock options up front while moving completely depleted items to the bottom layer.
     */
    const menuItems = [...restaurant.menuItems].sort((a, b) => {
        const isAInStock = a.stock > 0;
        const isBInStock = b.stock > 0;

        return Number(isBInStock) - Number(isAInStock);
    });

    return (
        <Box
            padding={{ mobile: theme.spacing(5), tablet: theme.spacing(4, 0) }}
            marginBottom={8}
        >
            <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => void navigate(ROUTES.ROOT)}
            >
                Back
            </Button>
            <HeaderWrapper>
                <HeaderContent>
                    <Typography variant="h3">
                        {restaurant.name.toUpperCase()}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.8)}
                    >
                        {restaurant.description}
                    </Typography>
                    <Typography
                        variant="body1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        {restaurant.address}
                    </Typography>
                </HeaderContent>
                <ContactWrapper>
                    <TimingChip>
                        <Typography variant="subtitle1" color="primary">
                            Open now
                        </Typography>
                        <Typography variant="subtitle1" color="common.black">
                            {restaurant.openingTime} - {restaurant.closingTime}
                        </Typography>
                    </TimingChip>

                    <CustomDivider orientation="vertical" flexItem />

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <PhoneIcon color="error" />
                        <Link
                            href={`tel:+91${restaurant.contactNumber}`}
                            underline="none"
                            color="common.black"
                        >
                            +91 {restaurant.contactNumber}
                        </Link>
                    </Stack>
                </ContactWrapper>
            </HeaderWrapper>
            {permissions.includes(Permission.ADD_MENU_ITEM) && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddMenuItem}
                >
                    Add Item
                </Button>
            )}
            <Grid2 container spacing={8} mt={8}>
                {menuItems.map((item) => (
                    <Grid2
                        key={item.id}
                        size={{ mobile: 12, tablet: 12, desktop: 6 }}
                    >
                        <MenuItemCard
                            menuItem={item}
                            role={userRole || USER_ROLE.GUEST}
                            quantity={selectedQuantity[item.id] ?? 0}
                            onIncrement={() =>
                                setSelectedQuantity((prev) => ({
                                    ...prev,
                                    [item.id]: (prev[item.id] ?? 0) + 1,
                                }))
                            }
                            onDecrement={() =>
                                setSelectedQuantity((prev) => ({
                                    ...prev,
                                    [item.id]: (prev[item.id] ?? 0) - 1,
                                }))
                            }
                            onAddToCart={() => handleAddToCart(item)}
                            onDelete={() => handleDeleteItem(item)}
                            onEdit={() => handleEditMenuItem(item)}
                        />
                    </Grid2>
                ))}
            </Grid2>
            <ActionDialog
                open={feedback.open && Boolean(itemtToDelete)}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    );
};

export default Restaurant;
