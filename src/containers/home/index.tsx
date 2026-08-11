import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Box, Grid2 as Grid, ToggleButton, Typography } from '@mui/material';

import { ActionDialog } from '@components/ActionDialog/ActionDialog';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
} from '@components/constants';
import { RestaurantCard } from '@containers/RestaurantCard/RestaurantCard.container';
import { DISCOVERY_ACTION } from '@config/discoveryActions';
import { Permission } from '@config/permissions';
import { rolePermissions } from '@config/rolePermissions';
import { FOOD_CATEGORY } from '@constant';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { deleteRestaurant } from '@features/restaurant/restaurantSlice';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { isOpenToday } from '@utils/getOpenRestaurants';
import { getVisibleRestaurants } from '@utils/getVisibleRestaurants';

import { Restaurant } from '@types';
import { USER_ROLE } from '../../types/user.types';
import { ToggleButtonGroup } from '@components/MultiToggle';
import { ExceptionState } from '@components/ExceptionState';

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

    /**
     * Closes the delete confirmation dialog and clears the selected restaurant state.
     */
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

    /**
     * Navigates the user to the details page of the selected restaurant.
     * @param restaurant - The restaurant object to view.
     */
    const openRestaurant = (restaurant: Restaurant) => {
        void navigate(`/restaurants/${restaurant.id}`);
    };

    /**
     * Navigates the user to the edit form page for the selected restaurant.
     * @param restaurant - The restaurant object to edit.
     */
    const handleEditRestaurant = (restaurant: Restaurant) => {
        void navigate(`/restaurants/${restaurant.id}/edit`);
    };

    /**
     * Saves the target restaurant for deletion and opens the confirmation popup.
     * @param restaurant - The restaurant object selected for deletion.
     */
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

    /**
     * Triggers the deletion action for the saved restaurant and closes the popup.
     */
    const handleConfirmDelete = () => {
        if (restaurantToDelete) {
            dispatch(deleteRestaurant(restaurantToDelete.id));
        }
        handleCloseDialog();
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
        setCategory(newCategory || FOOD_CATEGORY.BOTH);
    };

    return (
        <Box
            padding={{ mobile: theme.spacing(4), tablet: theme.spacing(4, 0) }}
            marginBottom={8}
        >
            <ToggleButtonGroup
                color="primary"
                value={category}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value={FOOD_CATEGORY.BOTH}>
                    <Typography variant="body1" color="primary" mt={0.5}>
                        Both
                    </Typography>
                </ToggleButton>
                <ToggleButton value={FOOD_CATEGORY.VEG} color="success">
                    <Typography variant="body1" color="success" mt={0.5}>
                        Veg
                    </Typography>
                </ToggleButton>
                <ToggleButton value={FOOD_CATEGORY.NON_VEG} color="error">
                    <Typography variant="body1" color="error" mt={0.5}>
                        Non Veg
                    </Typography>
                </ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={10}>
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
                        <Grid
                            key={restaurant.id}
                            size={{ mobile: 12, tablet: 6, desktop: 4 }}
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
                        </Grid>
                    ))
                )}
            </Grid>

            <ActionDialog
                open={feedback.open && Boolean(restaurantToDelete)}
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

export default Home;
