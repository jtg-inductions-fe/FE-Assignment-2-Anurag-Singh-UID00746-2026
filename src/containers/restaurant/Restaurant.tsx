import { rolePermissions } from '@config/rolePermissions';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { USER_ROLE } from '../../types/user.types';
import { useNavigate, useParams } from 'react-router-dom';
import ExceptionState from '@components/ExceptionState/ExceptionState';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
} from '@components/constants';
import { alpha, Box, Grid2, Link, Stack, Typography } from '@mui/material';
import { theme } from '@theme/index';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { useState } from 'react';
import MenuItemCard from '@components/MenuItemCard/MenuItemCard';
import { addToCart } from '@features/cart/cartSlice';
import { MenuItem } from '../../types/menuItem.types';
import { showToast } from '@features/toast/toastSlice';
import { deleteMenuItemThunk } from '@features/restaurant/restaurantThunk';
import { ActionDialog } from '@components/ActionDialog/ActionDialog';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { ROUTES } from '@router/routes';
import { Permission } from '@config/permissions';
import MyButton from '@components/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PhoneIcon from '@mui/icons-material/Phone';
import {
    ContactWrapper,
    CustomDivider,
    HeaderContent,
    HeaderWrapper,
    TimingChip,
} from './Restaurant.styles';

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

    const handleEditMenuItem = (item: MenuItem) => {
        void navigate(
            ROUTES.MENU_ITEMS.EDIT_MENU_ITEM.replace(
                ':id',
                restaurant.id,
            ).replace(':menuItemId', item.id),
        );
    };

    const handleAddMenuItem = () => {
        void navigate(
            ROUTES.MENU_ITEMS.ADD_MENU_ITEM.replace(':id', restaurant.id),
        );
    };

    const handleCloseDialog = () => {
        dispatch(closeDialog());
        setItemToDelete(undefined);
    };

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

    return (
        <Box
            padding={{ mobile: theme.spacing(5), tablet: theme.spacing(4, 0) }}
            marginBottom={8}
        >
            <MyButton
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => void navigate(ROUTES.ROOT)}
            >
                Back
            </MyButton>
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
                            Open now -&nbsp;
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
                <MyButton
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddMenuItem}
                >
                    Add Item
                </MyButton>
            )}
            <Grid2 container spacing={8} mt={8}>
                {restaurant.menuItems.map((item) => {
                    return (
                        <Grid2
                            key={item.id}
                            size={{ mobile: 12, tablet: 12, desktop: 6 }}
                        >
                            <MenuItemCard
                                menuItem={item}
                                isOwner={userRole === USER_ROLE.OWNER}
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
                    );
                })}
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
