import { rolePermissions } from '@config/rolePermissions';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import {
    alpha,
    Box as MuiBox,
    Grid2 as MuiGrid,
    Link as MuiLink,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import { theme } from '@theme/index';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { useState } from 'react';
import MenuItemCard from '@components/MenuItemCard/MenuItemCard';
import { addToCart } from '@features/cart/cartSlice';
import { MenuItem } from '../../types/menuItem.types';
import { showToast } from '@features/toast/toastSlice';
import { deleteMenuItemThunk } from '@features/restaurant/restaurantThunk';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { ROUTES } from '@router/routes';
import { Permission } from '@config/permissions';
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
import ExceptionState from '@components/ExceptionState/ExceptionState.component';
import { ActionDialog } from '@components/ActionDialog/ActionDialog.component';
import { Button } from '@components/Button/Button.component';

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
                            Open now -&nbsp;
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
                permissions.includes(Permission.ADD_MENU_ITEM) && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddMenuItem}
                    >
                        Add Item
                    </Button>
                )}
            <MuiGrid container spacing={8} mt={8}>
                {restaurant.menuItems.map((item) => {
                    return (
                        <MuiGrid key={item.id} size={{ xs: 12, sm: 12, md: 6 }}>
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
