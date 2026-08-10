import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import logo from '@assets/images/logo.webp';
import { ActionDialog } from '@components/ActionDialog/ActionDialog.component';
import {
    ACTION_DIALOG_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import { Image } from '@components/ImageBox/ImageBox.styles';
import SearchBar from '@components/SearchBar/SearchBar.component';
import UserProfile from '@components/UserProfile/UserProfile.component';
import { HEADER_ACTION } from '@config/headerActions';
import { rolePermissions } from '@config/rolePermissions';
import { logout } from '@features/auth/authSlice';
import { closeDialog, openDialog } from '@features/feedback/feedbackSlice';
import { showToast } from '@features/toast/toastSlice';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import {
    ActionWrapper,
    Container,
    LogoWrapper,
    RightSection,
    Root,
    SearchWrapper,
} from './Header.styles';
import Button from '@components/Button/Button.component';

const Header = () => {
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state) => state.feedback);
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    /**
     * TODO: Will be changed in further branches
     */
    const handleLogin = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    /**
     * TODO: Will be changed in further branches
     */
    const handleCart = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    /**
     * TODO: Will be changed in further branches
     */
    const handleAddRestaurant = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    /**
     * Logouts the user after confirmation
     */
    const onSubmit = () => {
        dispatch(logout());
        setDialogOpen(false);
        void navigate(ROUTES.AUTH.LOGIN);
        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: 'Logged out successfully !!',
            }),
        );
    };

    /**
     * Opens a feedback modal for confirmation
     */
    const handleLogoutClick: () => void = () => {
        setDialogOpen(true);
        dispatch(
            openDialog({
                title: 'LOG OUT ?',
                description:
                    'Are you sure you want to logout from your account ?',
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Logout',
                cancelText: 'Cancel',
            }),
        );
    };

    /**
     * Closes the feedback modal
     */
    const handleCloseDialog = () => {
        setDialogOpen(false);
        dispatch(closeDialog());
    };

    const { user, isLoggedIn } = useAppSelector((state) => state.auth);
    const userRole = user?.role;

    const permissions = rolePermissions[userRole ?? USER_ROLE.GUEST];

    const visibleActions = HEADER_ACTION.filter((action) =>
        permissions.includes(action.permission),
    );

    const actionHandlers = {
        login: handleLogin,
        cart: handleCart,
        addRestaurant: handleAddRestaurant,
    };

    const actions = visibleActions.map((action) => ({
        ...action,
        onClick: actionHandlers[action.id as keyof typeof actionHandlers],
    }));

    return (
        <Root>
            <Container>
                <LogoWrapper>
                    <Image src={logo} alt="Bitego" />
                </LogoWrapper>

                <SearchWrapper>
                    <SearchBar placeholder="Restaurant name" />
                </SearchWrapper>

                <RightSection>
                    <ActionWrapper>
                        {actions.map((action) => (
                            <Button
                                key={action.id}
                                variant="contained"
                                startIcon={
                                    action.id === 'addRestaurant' ? (
                                        <AddIcon />
                                    ) : action.id === 'cart' ? (
                                        <ShoppingCartOutlinedIcon />
                                    ) : null
                                }
                                onClick={action.onClick}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </ActionWrapper>
                    {isLoggedIn && (
                        <UserProfile handleLogout={handleLogoutClick} />
                    )}
                </RightSection>
            </Container>

            <ActionDialog
                open={dialogOpen}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                onClose={handleCloseDialog}
                onConfirm={onSubmit}
            />
        </Root>
    );
};

export default Header;
