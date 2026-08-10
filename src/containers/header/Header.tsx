import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import logo from '@assets/images/logo.webp';
import { ActionDialog } from '@components/ActionDialog/ActionDialog.component';
import MyButton from '@components/Button/Button';
import { ACTION_DIALOG_TYPES, TOAST_TYPES } from '@components/constants';
import { MyImage } from '@components/ImageBox/ImageBox.styles';
import SearchBar from '@components/SearchBar/SearchBar';
import UserProfile from '@components/UserProfile/UserProfile';
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
import { USER_ROLE } from '../../types/user.types';

const Header = () => {
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state) => state.feedback);
    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleLogin = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    const handleCart = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    const handleAddRestaurant = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

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

    const handleCloseDialog = () => {
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
                    <MyImage src={logo} alt="Bitego" />
                </LogoWrapper>

                <SearchWrapper>
                    <SearchBar placeholder="Restaurant name" />
                </SearchWrapper>

                <RightSection>
                    <ActionWrapper>
                        {actions.map((action) => (
                            <MyButton
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
                            </MyButton>
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
