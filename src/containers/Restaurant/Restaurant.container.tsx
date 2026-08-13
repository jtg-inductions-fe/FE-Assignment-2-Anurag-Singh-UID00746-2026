import { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import {
    alpha,
    Box as MuiBox,
    Grid2 as MuiGrid,
    Link as MuiLink,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';

import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import MenuItemCard from '@containers/MenuItemCard/MenuItemCard.container';
import { addToCart } from '@features/cart/cartSlice';
import { closeDialog } from '@features/feedback/feedbackSlice';
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
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';
import { ActionDialog } from '@components/ActionDialog';
import { permission, rolepermissions } from '@containers/common/constants';
import { showDialog } from '@utils/openDialog';

const Restaurant = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { user } = useAppSelector((state) => state.auth);
    const { restaurants, error } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);
    const dispatch = useAppDispatch();

    const [itemtToDelete, setItemToDelete] = useState<MenuItem | undefined>(
        undefined,
    );

    useSearchRestaurants();

    const userRole = user?.role;
    const restaurant = restaurants.find((item) => item.id === id);

    const permissions = rolepermissions[userRole || USER_ROLE.GUEST];

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
                quantity: 1,
            }),
        );
        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: `Added [${item.name}] to your cart !!`,
            }),
        );
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
        showDialog(
            {
                title: `DELETE ${item.name} ?`,
                description: `Are you sure you want to delete ${item.name} from your restaurant ?`,
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Delete',
                cancelText: 'Cancel',
            },
            dispatch,
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

    const currentDay = new Date()
        .toLocaleString('en-US', { weekday: 'long' })
        .toLowerCase();

    const isOpen = restaurant.operatingDays
        ? !!restaurant.operatingDays[
              currentDay as keyof typeof restaurant.operatingDays
          ]
        : true;

    return (
        <MuiBox
            padding={{ xs: theme.spacing(5), sm: theme.spacing(4, 0) }}
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
                    <MuiTypography variant="h3">
                        {restaurant.name.toUpperCase()}
                    </MuiTypography>
                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.8)}
                    >
                        {restaurant.description}
                    </MuiTypography>
                    <MuiTypography
                        variant="body1"
                        color={alpha(theme.palette.text.secondary, 0.6)}
                    >
                        {restaurant.address}
                    </MuiTypography>
                </HeaderContent>
                <ContactWrapper>
                    <TimingChip>
                        <MuiTypography variant="subtitle1" color="primary">
                            Open now
                        </MuiTypography>
                        <MuiTypography variant="subtitle1" color="common.black">
                            {restaurant.openingTime} - {restaurant.closingTime}
                        </MuiTypography>
                    </TimingChip>

                    <CustomDivider orientation="vertical" flexItem />

                    <MuiStack direction="row" alignItems="center" spacing={2}>
                        <PhoneIcon color="error" />
                        <MuiLink
                            href={`tel:+91${restaurant.contactNumber}`}
                            underline="none"
                            color="common.black"
                        >
                            +91 {restaurant.contactNumber}
                        </MuiLink>
                    </MuiStack>
                </ContactWrapper>
            </HeaderWrapper>
            {user?.id === restaurant.ownerId &&
                permissions.includes(permission.ADD_MENU_ITEM) && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddMenuItem}
                    >
                        Add Item
                    </Button>
                )}
            <MuiGrid container spacing={8} mt={8}>
                {menuItems.map((item) => {
                    return (
                        <MuiGrid key={item.id} size={{ xs: 12, sm: 12, md: 6 }}>
                            <MenuItemCard
                                isOpen={isOpen}
                                menuItem={item}
                                role={userRole || USER_ROLE.GUEST}
                                onAddToCart={() => handleAddToCart(item)}
                                onDelete={() => handleDeleteItem(item)}
                                onEdit={() => handleEditMenuItem(item)}
                            />
                        </MuiGrid>
                    );
                })}
            </MuiGrid>
            <ActionDialog
                open={feedback.open && Boolean(itemtToDelete)}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                cancelButtonConfig={{ color: 'primary', variant: 'outlined' }}
                confirmButtonConfig={{ color: 'error', variant: 'contained' }}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
            />
        </MuiBox>
    );
};

export default Restaurant;
