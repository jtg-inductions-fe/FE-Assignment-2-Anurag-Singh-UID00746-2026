import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Link } from '@mui/material';

import logo from '@assets/images/logo.webp';
import {
    ACTION_DIALOG_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import { logout } from '@features/auth/authSlice';
import { closeDialog } from '@features/feedback/feedbackSlice';
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
import { Image } from '@components/ImageBox';
import { SearchBar } from '@components/SearchBar';
import { Button } from '@components/Button';
import { UserProfile } from '@components/UserProfile';
import { ActionDialog } from '@components/ActionDialog';
import { HEADER_ACTION } from './headerActions';
import { rolepermissions } from '@containers/common/constants';
import { showDialog } from '@utils/openDialog';

const Header = () => {
    const dispatch = useAppDispatch();
    const feedback = useAppSelector((state) => state.feedback);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('restaurant') ?? '';

    /**
     * Redirects the user to login route
     */
    const handleLogin = () => {
        void navigate(ROUTES.AUTH.LOGIN);
    };

    /**
     * Redirects the user to cart route
     */
    const handleCart = () => {
        void navigate(ROUTES.CART);
    };

    /**
     * Redirects the user to add restaurant route
     */
    const handleAddRestaurant = () => {
        void navigate(ROUTES.RESTAURANTS.ADD_RESTAURANT);
    };

    /**
     * If the url is not the root page then redirects to the root route after the search
     */
    const handleSearch = (value: string) => {
        const search = value.trim();

        if (location.pathname !== ROUTES.ROOT) {
            void navigate(search ? `/?restaurant=${search}` : ROUTES.ROOT);

            return;
        }

        setSearchParams(value.trim() ? { restaurant: value } : {});
    };

    /**
     * Dispatches logout action and redirects to the login route
     */
    const onSubmit = () => {
        dispatch(logout());
        void navigate(ROUTES.AUTH.LOGIN);
        dispatch(closeDialog());
        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: 'Logged out successfully !!',
            }),
        );
    };

    /**
     * Dispatches open dialog action to get the confirmation from the user
     */
    const handleLogoutClick: () => void = () => {
        showDialog(
            {
                title: 'LOG OUT',
                description:
                    'Are you sure you want to logout from your account ?',
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Logout',
                cancelText: 'Cancel',
            },
            dispatch,
        );
    };

    /**
     * Redirects to the orders route
     */
    const handleOrdersClick: () => void = () => {
        void navigate(ROUTES.ORDERS);
    };

    /**
     * Dispatches close dialog action to close the feedback modal
     */
    const handleCloseDialog = () => {
        dispatch(closeDialog());
    };

    const { user, isLoggedIn } = useAppSelector((state) => state.auth);
    const userRole = user?.role;

    const permissions = rolepermissions[userRole ?? USER_ROLE.GUEST];

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
                <Link href={ROUTES.ROOT}>
                    <LogoWrapper>
                        <Image src={logo} alt="Bitego" />
                    </LogoWrapper>
                </Link>

                <SearchWrapper>
                    <SearchBar
                        placeholder="Restaurant name"
                        value={keyword}
                        onChange={handleSearch}
                    />
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
                        <Box
                            tabIndex={0}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLDivElement>,
                            ) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const profileButton =
                                        e.currentTarget.querySelector(
                                            '[role="button"], button',
                                        );

                                    if (profileButton) {
                                        (profileButton as HTMLElement).click();
                                    }
                                }
                            }}
                        >
                            <UserProfile
                                handleLogout={handleLogoutClick}
                                handleOrders={handleOrdersClick}
                            />
                        </Box>
                    )}
                </RightSection>
            </Container>

            <ActionDialog
                open={feedback.open}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                onClose={handleCloseDialog}
                cancelButtonConfig={{ color: 'primary', variant: 'outlined' }}
                confirmButtonConfig={{ color: 'error', variant: 'contained' }}
                onConfirm={onSubmit}
            />
        </Root>
    );
};

export default Header;
