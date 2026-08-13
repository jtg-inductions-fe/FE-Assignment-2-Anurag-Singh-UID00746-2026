import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    Box as MuiBox,
    Divider as MuiDivider,
    Typography as MuiTypography,
} from '@mui/material';

import {
    selectCartItemCount,
    selectCartItemsByRestaurant,
    selectCartSubtotal,
} from '@features/cart/cartSelectors';
import {
    clearCart,
    decreaseQuantity,
    increaseQuantity,
} from '@features/cart/cartSlice';
import { closeDialog } from '@features/feedback/feedbackSlice';
import { useSearchRestaurants } from '@hooks/useSearchRestaurants';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    ACTION_DIALOG_TYPES,
    EXCEPTION_STATE_TYPES,
} from '@components/constants';

import {
    ActionContainer,
    CartItem,
    CartSection,
    Container,
    Description,
    Header,
    HeaderContent,
    ItemPrice,
    Name,
    QuantityContainer,
    RestaurantCard,
    RestaurantHeader,
    RestaurantItems,
    Wrapper,
} from './Cart.styles';
import { ROUTES } from '@router/routes';
import { showToast } from '@features/toast/toastSlice';
import { TOAST_TYPES } from '@components/constants';
import { Order } from '@types';
import { createOrderThunk } from '@features/orders/orderThunk';
import { generateOrderId } from '@utils/getCustomOrderId';
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';
import { QuantitySelector } from '@components/QuantitySelector';
import { ActionDialog } from '@components/ActionDialog';
import { BillCard } from '@components/BillCard';
import { showDialog } from '@utils/openDialog';

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useSearchRestaurants();

    const groupedItems = useAppSelector(selectCartItemsByRestaurant);

    const itemCount = useAppSelector(selectCartItemCount);

    const subtotal = useAppSelector(selectCartSubtotal);

    const cartItems = useAppSelector((state) => state.cart.items);

    const restaurants = useAppSelector((state) => state.restaurant.restaurants);
    const customerId = useAppSelector((state) => state.auth.user?.id);

    const feedback = useAppSelector((state) => state.feedback);

    const [pendingClear, setPendingClear] = useState(false);

    const [placingOrder, setPlacingOrder] = useState(false);

    /**
     * Navigates the user back to the home page screen.
     */
    const handleBack = () => {
        navigate(ROUTES.ROOT);
    };

    /**
     * Increases the quantity of a specific item in the cart by one.
     * @param itemId - The unique identifier of the target cart item.
     */
    const handleIncrease = (itemId: string) => {
        dispatch(increaseQuantity(itemId));
    };

    /**
     * Decreases the quantity of a specific item in the cart by one.
     * @param itemId - The unique identifier of the target cart item.
     */
    const handleDecrease = (itemId: string) => {
        dispatch(decreaseQuantity(itemId));
    };

    /**
     * Opens a confirmation alert box asking the user if they want to empty their cart.
     */
    const handleClearCart = () => {
        setPendingClear(true);
        showDialog(
            {
                title: 'Clear Cart',
                description:
                    'Are you sure you want to clear all the items from your cart ?',
                type: ACTION_DIALOG_TYPES.ALERT,
                confirmText: 'Clear',
                cancelText: 'Cancel',
            },
            dispatch,
        );
    };

    /**
     * Empties all items from the cart and shows a success banner alert.
     */
    const handleConfirmClear = () => {
        dispatch(closeDialog());
        dispatch(clearCart());
        setPendingClear(false);
        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Success',
                message: 'Cart cleared successfully !!',
            }),
        );
    };

    /**
     * Closes the clear cart pop-up box without removing any items.
     */
    const handleCancelClear = () => {
        dispatch(closeDialog());
        setPendingClear(false);
    };

    /**
     * Creates and sends a new order payload to the database backend.
     * Clears the active cart state and redirects the user to the orders listing dashboard.
     */
    const handlePlaceOrder = async () => {
        if (!customerId || cartItems.length === 0) {
            return;
        }

        const order: Order = {
            id: generateOrderId(),
            customerId,
            restaurantId: cartItems[0].restaurantId,
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            totalPrice: subtotal,
            date: new Date().toISOString(),
            status: 'Pending',
        };

        setPlacingOrder(true);

        try {
            await dispatch(createOrderThunk(order)).unwrap();
        } finally {
            setPlacingOrder(false);
        }

        dispatch(clearCart());

        dispatch(
            showToast({
                type: TOAST_TYPES.SUCCESS,
                title: 'Order Placed',
                message: 'Your order has been placed successfully !!',
            }),
        );

        navigate(ROUTES.ORDERS);
    };

    return (
        <Container>
            {itemCount === 0 ? (
                <ExceptionState
                    type={EXCEPTION_STATE_TYPES.EMPTY}
                    title="CART IS EMPTY"
                    description="We couldn't find any item in your cart."
                    mt={30}
                />
            ) : (
                <MuiBox>
                    <Header>
                        <HeaderContent>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIosNewIcon />}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </HeaderContent>
                    </Header>

                    <Wrapper>
                        <CartSection>
                            {Object.entries(groupedItems).map(
                                ([restaurantId, items]) => {
                                    const restaurant = restaurants.find(
                                        (item) => item.id === restaurantId,
                                    );

                                    return (
                                        <RestaurantCard key={restaurantId}>
                                            <RestaurantHeader>
                                                <MuiTypography variant="h6">
                                                    {restaurant?.name.toUpperCase()}
                                                </MuiTypography>
                                            </RestaurantHeader>

                                            <RestaurantItems>
                                                {items.map((item, index) => (
                                                    <MuiBox key={item.id}>
                                                        <CartItem>
                                                            <Description>
                                                                <Name variant="body1">
                                                                    {item.name}
                                                                </Name>
                                                                <MuiTypography
                                                                    variant="body1"
                                                                    color="text.secondary"
                                                                >
                                                                    {
                                                                        item.description
                                                                    }
                                                                </MuiTypography>
                                                            </Description>

                                                            <QuantityContainer>
                                                                <QuantitySelector
                                                                    quantity={
                                                                        item.quantity
                                                                    }
                                                                    onIncrement={() =>
                                                                        handleIncrease(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    onDecrement={() =>
                                                                        handleDecrease(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                />
                                                                <ItemPrice>
                                                                    <MuiTypography
                                                                        variant="h6"
                                                                        color="common.black"
                                                                        letterSpacing={
                                                                            2
                                                                        }
                                                                    >
                                                                        ₹
                                                                        {item.price *
                                                                            item.quantity}
                                                                    </MuiTypography>
                                                                </ItemPrice>
                                                            </QuantityContainer>
                                                        </CartItem>

                                                        {index <
                                                            items.length -
                                                                1 && (
                                                            <MuiDivider />
                                                        )}
                                                    </MuiBox>
                                                ))}
                                            </RestaurantItems>
                                        </RestaurantCard>
                                    );
                                },
                            )}
                        </CartSection>
                        <BillCard subtotal={subtotal} />
                    </Wrapper>
                    {itemCount > 0 && (
                        <ActionContainer>
                            <Button
                                variant="contained"
                                onClick={handlePlaceOrder}
                                loading={placingOrder}
                                disabled={placingOrder}
                            >
                                Place Order
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteOutlineIcon />}
                                onClick={handleClearCart}
                                loading={pendingClear}
                                disabled={pendingClear}
                            >
                                Clear Cart
                            </Button>
                        </ActionContainer>
                    )}
                </MuiBox>
            )}
            <ActionDialog
                open={feedback.open && pendingClear}
                title={feedback.title}
                description={feedback.description}
                type={feedback.type}
                confirmText={feedback.confirmText}
                cancelText={feedback.cancelText}
                cancelButtonConfig={{ color: 'primary', variant: 'outlined' }}
                confirmButtonConfig={{ color: 'error', variant: 'contained' }}
                onClose={handleCancelClear}
                onConfirm={handleConfirmClear}
            />
        </Container>
    );
};

export default Cart;
