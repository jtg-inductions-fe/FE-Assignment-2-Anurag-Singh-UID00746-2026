import { rolePermissions } from '@config/rolePermissions';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { DISCOVERY_ACTION } from '@config/discoveryActions';
import { getVisibleRestaurants } from '@utils/getVisibleRestaurants';
import { useNavigate } from 'react-router-dom';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    USER_ROLE,
} from '@components/constants';
import { Restaurant } from '../../types/restaurant.types';
import { RestaurantCard } from '@components/RestaurantCard/RestaurantCard';
import {
    Box as MuiBox,
    Grid2 as MuiGrid,
    ToggleButton as MuiToggleButton,
    Typography as MuiTypography,
} from '@mui/material';
import { theme } from '@theme/index';
import { useState } from 'react';
import { deleteRestaurant } from '@features/restaurant/restaurantSlice';
import { isOpenToday } from '@utils/getOpenRestaurants';
import MultiToggle from '@components/MultiToggle/MultiToggle';
import { FOOD_CATEGORY } from '@constant/index';
import { Permission } from '@config/permissions';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { ActionDialog } from '@components/ActionDialog/ActionDialog.component';
import ExceptionState from '@components/ExceptionState/ExceptionState.component';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { restaurants } = useAppSelector((state) => state.restaurant);
    const feedback = useAppSelector((state) => state.feedback);
    const [restaurantToDelete, setRestaurantToDelete] = useState<
        Restaurant | undefined
    >(undefined);

    useSearchRestaurants();

    const visibleRestaurants = getVisibleRestaurants(restaurants, user);

    const userRole = user?.role;

    const handleCloseDialog = () => {
        dispatch(closeDialog());
        setRestaurantToDelete(undefined);
    };

    const permissions = rolePermissions[userRole ?? USER_ROLE.GUEST];

    const canEdit = permissions?.includes(Permission.EDIT_RESTAURANT);
    const canDelete = permissions?.includes(Permission.DELETE_RESTAURANT);

    const visibleActions = DISCOVERY_ACTION.filter((action) =>
        permissions.includes(action.permission),
    );

    const openRestaurant = (restaurant: Restaurant) => {
        void navigate(`/restaurants/${restaurant.id}`);
    };

    const handleEditRestaurant = (restaurant: Restaurant) => {
        void navigate(`/restaurants/${restaurant.id}/edit`);
    };

    const handleDeleteRestaurant = (restaurant: Restaurant) => {
        setRestaurantToDelete(restaurant);
        dispatch(
            openDialog({
                title: 'DELETE RESTAURANT ?',
                description:
                    'Are you sure you want to delete this restaurant ?',
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Delete',
                cancelText: 'Cancel',
            }),
        );
    };

    const handleConfirmDelete = () => {
        if (restaurantToDelete) {
            dispatch(deleteRestaurant(restaurantToDelete.id));
        }
        handleCloseDialog();
    };

    const [category, setCategory] = useState<string>(FOOD_CATEGORY.BOTH);

    const filteredVisibleRestaurants = visibleRestaurants
        .filter((restaurant) => {
            if (category === FOOD_CATEGORY.BOTH) {
                return true;
            }

            return restaurant.category === category;
        })
        .sort((a, b) => {
            const currentDay = new Date()
                .toLocaleString('en-US', { weekday: 'long' })
                .toLowerCase();

            const isAOpen = a.operatingDays
                ? !!a.operatingDays[currentDay as keyof typeof a.operatingDays]
                : true;

            const isBOpen = b.operatingDays
                ? !!b.operatingDays[currentDay as keyof typeof b.operatingDays]
                : true;

            return Number(isBOpen) - Number(isAOpen);
        });

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategory: string,
    ) => {
        setCategory(newCategory || FOOD_CATEGORY.BOTH);
    };

    return (
        <MuiBox
            padding={{ xs: theme.spacing(4), sm: theme.spacing(4, 0) }}
            marginBottom={8}
        >
            <MultiToggle
                color="primary"
                value={category}
                exclusive
                onChange={handleChange}
                aria-label="Restaurant category"
            >
                <MuiToggleButton value={FOOD_CATEGORY.BOTH}>
                    <MuiTypography variant="body1" color="primary" mt={0.5}>
                        Both
                    </MuiTypography>
                </MuiToggleButton>
                <MuiToggleButton value={FOOD_CATEGORY.VEG} color="success">
                    <MuiTypography variant="body1" color="success" mt={0.5}>
                        Veg
                    </MuiTypography>
                </MuiToggleButton>
                <MuiToggleButton value={FOOD_CATEGORY.NON_VEG} color="error">
                    <MuiTypography variant="body1" color="error" mt={0.5}>
                        Non Veg
                    </MuiTypography>
                </MuiToggleButton>
            </MultiToggle>

            <MuiGrid container spacing={10}>
                {filteredVisibleRestaurants.length === 0 ? (
                    <ExceptionState
                        type={EXCEPTION_STATE_TYPES.EMPTY}
                        title="No Data Found"
                        description="No data found for the selected filters. Please 
                        try different filters 
                        or clear all filters to see all data."
                    />
                ) : (
                    filteredVisibleRestaurants.map((restaurant) => (
                        <MuiGrid
                            key={restaurant.id}
                            size={{ xs: 12, md: 6, lg: 4 }}
                        >
                            <RestaurantCard
                                restaurant={restaurant}
                                actions={visibleActions}
                                isOpen={isOpenToday(restaurant)}
                                onCardClick={openRestaurant}
                                onEdit={handleEditRestaurant}
                                onDelete={handleDeleteRestaurant}
                                canEdit={canEdit}
                                canDelete={canDelete}
                            />
                        </MuiGrid>
                    ))
                )}
            </MuiGrid>

            <ActionDialog
                open={feedback.open && Boolean(restaurantToDelete)}
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

export default Home;
