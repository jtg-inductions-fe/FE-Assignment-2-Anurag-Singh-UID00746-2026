import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    Box as MuiBox,
    Grid2 as MuiGrid,
    ToggleButton as MuiToggleButton,
    Typography as MuiTypography,
} from '@mui/material';

import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import { RestaurantCard } from '@containers/RestaurantCard/RestaurantCard.container';
import { closeDialog } from '@features/feedback/feedbackSlice';
import { deleteRestaurant } from '@features/restaurant/restaurantSlice';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { isOpenToday } from '@utils/getOpenRestaurants';
import { getVisibleRestaurants } from '@utils/getVisibleRestaurants';

import { Restaurant } from '@types';
import { ToggleButtonGroup } from '@components/MultiToggle';
import { ExceptionState } from '@components/ExceptionState';
import { FOOD_CATEGORY } from '@constant/index';
import { ActionDialog } from '@components/ActionDialog';
import { permission, rolepermissions } from '@containers/common/constants';
import { DISCOVERY_ACTION } from './discoveryActions';
import { ROUTES } from '@router/routes';
import { showDialog } from '@utils/openDialog';
import { showToast } from '@features/toast/toastSlice';

export const Home = () => {
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

    /**
     * Closes the delete confirmation dialog and clears the selected restaurant state.
     */
    const handleCloseDialog = () => {
        dispatch(closeDialog());
        setRestaurantToDelete(undefined);
    };

    const permissions = rolepermissions[userRole ?? USER_ROLE.GUEST];

    const canEdit = permissions?.includes(permission.EDIT_RESTAURANT);
    const canDelete = permissions?.includes(permission.DELETE_RESTAURANT);

    const visibleActions = DISCOVERY_ACTION.filter((action) =>
        permissions.includes(action.permission),
    );

    /**
     * Navigates the user to the details page of the selected restaurant.
     * @param restaurant - The restaurant object to view.
     */
    const openRestaurant = (restaurant: Restaurant) => {
        void navigate(
            ROUTES.RESTAURANTS.RESTAURANT_DETAILS.replace(':id', restaurant.id),
        );
    };

    /**
     * Navigates the user to the edit form page for the selected restaurant.
     * @param restaurant - The restaurant object to edit.
     */
    const handleEditRestaurant = (restaurant: Restaurant) => {
        void navigate(
            ROUTES.RESTAURANTS.EDIT_RESTAURANT.replace(':id', restaurant.id),
        );
    };

    /**
     * Saves the target restaurant for deletion and opens the confirmation popup.
     * @param restaurant - The restaurant object selected for deletion.
     */
    const handleDeleteRestaurant = (restaurant: Restaurant) => {
        setRestaurantToDelete(restaurant);
        showDialog(
            {
                title: 'DELETE RESTAURANT',
                description:
                    'Are you sure you want to delete this restaurant ?',
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Delete',
                cancelText: 'Cancel',
            },
            dispatch,
        );
    };

    /**
     * Triggers the deletion action for the saved restaurant and closes the popup.
     */
    const handleConfirmDelete = () => {
        if (restaurantToDelete) {
            dispatch(deleteRestaurant(restaurantToDelete.id));
        }
        handleCloseDialog();

        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: 'Restaurant deleted successfully !!',
            }),
        );
    };

    const [category, setCategory] = useState<string>(FOOD_CATEGORY.BOTH);

    /**
     * Filters restaurants by selected food category and sorts them
     * so that restaurants open today appear first.
     */
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

    /**
     * Updates the active food category filter state when a user clicks a tab or toggle.
     * Defaults back to 'BOTH' if the selection is cleared.
     * @param _event - The mouse click event context.
     * @param newCategory - The newly chosen category string value.
     */
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newCategory: string,
    ) => {
        setCategory(newCategory);
    };

    return (
        <MuiBox
            padding={{ xs: theme.spacing(4), sm: theme.spacing(4, 0) }}
            marginBottom={8}
        >
            <ToggleButtonGroup
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
            </ToggleButtonGroup>

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
