import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import {
    alpha,
    Box as MuiBox,
    Divider as MuiDivider,
    IconButton as MuiIconButton,
    Typography as MuiTypography,
} from '@mui/material';

import {
    EXCEPTION_STATE_TYPES,
    TOAST_TYPES,
    USER_ROLE,
} from '@components/constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { updateOrderStatusThunk } from '@features/orders/orderThunk';
import { showToast } from '@features/toast/toastSlice';

import {
    Container,
    Header,
    HeaderContent,
    OrderCard,
    OrderSummary,
    OrderInfo,
    OrderIcon,
    OrderDetails,
    StatusContainer,
    ExpandedContent,
    OrderID,
    OrderTime,
} from './Orders.styles';

import type { Order, OrderStatus } from '@types';
import { ROUTES } from '@router/routes';
import { theme } from '@theme/index';
import { formatOrderDateTime } from '@utils/getFormattedDateTime';
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';
import { Chip } from '@components/Chip';
import { permission, rolepermissions } from '@containers/common/constants';
import { List } from '@components/List';
import { OrderSummaryCard } from '@components/OrderSummary';
import { CustomerOrderPanel } from './CustomerPanel.container';
import { OwnerOrderPanel } from './OwnerPanel.container';

export const OrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const orders = useAppSelector((state) => state.order.orders);
    const { user } = useAppSelector((state) => state.auth);

    const userRole = user?.role;

    const permissions = rolepermissions[userRole || USER_ROLE.GUEST];
    const canManageOrders = permissions.includes(permission.MANAGE_ORDERS);

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const customerOrders = orders.filter(
        (order) => order.customerId === user?.id,
    );

    const displayedOrders =
        userRole === USER_ROLE.CUSTOMER ? customerOrders : orders;

    if (orders.length === 0) {
        return (
            <ExceptionState
                type={EXCEPTION_STATE_TYPES.EMPTY}
                title="Orders not found"
                description="We couldn't find any orders."
            />
        );
    }

    /**
     * Toggles the accordion view of an order card to show or hide its inner item details.
     * Collapses the card if it is already open.
     * @param orderId - The unique identifier of the target order.
     */
    const handleToggleOrder = (orderId: string) => {
        setExpandedOrderId((currentId) =>
            currentId === orderId ? null : orderId,
        );
    };

    /**
     * Submits an async request to update an order's milestone tracker state in the backend database.
     * Triggers a toast notification banner indicating success or custom catch errors.
     * @param order - The complete target order data model object.
     * @param status - The new workflow status step to assign.
     * @param reason - An optional feedback message explaining why an order was rejected.
     */
    const handleStatusChange = async (
        order: Order,
        status: OrderStatus,
        reason?: string,
    ) => {
        try {
            await dispatch(
                updateOrderStatusThunk({
                    order,
                    status,
                    reason,
                }),
            ).unwrap();

            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Order Updated',
                    message: `Order marked as ${status}`,
                }),
            );
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Status Update Failed',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'Unable to update order status.',
                }),
            );
        }
    };

    return (
        <Container padding={{ xs: theme.spacing(5), sm: theme.spacing(4, 0) }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => void navigate(ROUTES.ROOT)}
            >
                Back
            </Button>
            <Header>
                <HeaderContent>
                    <MuiTypography variant="h3">
                        {userRole === USER_ROLE.CUSTOMER
                            ? 'MY ORDERS'
                            : 'MANAGE ORDERS'}
                    </MuiTypography>
                    <MuiTypography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.8)}
                    >
                        {userRole === USER_ROLE.CUSTOMER
                            ? 'View and track all your orders in one place'
                            : 'Track and manage all your orders in one place'}
                    </MuiTypography>
                </HeaderContent>
            </Header>

            <List
                items={displayedOrders}
                renderItem={(order) => {
                    const isExpanded = expandedOrderId === order.id;

                    return (
                        <OrderCard key={order.id}>
                            <OrderSummary
                                onClick={() => handleToggleOrder(order.id)}
                            >
                                <OrderInfo>
                                    <OrderIcon>
                                        <EventAvailableIcon fontSize="medium" />
                                    </OrderIcon>

                                    <OrderDetails>
                                        <OrderID>
                                            ORDER ID : #{order.id}
                                        </OrderID>

                                        <OrderTime>
                                            {formatOrderDateTime(order.date)}
                                        </OrderTime>
                                    </OrderDetails>
                                </OrderInfo>

                                <StatusContainer>
                                    <MuiTypography
                                        variant="subtitle1"
                                        color="common.black"
                                    >
                                        ₹{order.totalPrice}
                                    </MuiTypography>
                                    <Chip
                                        label={order.status}
                                        color={
                                            order.status === 'Delivered' ||
                                            order.status === 'Accepted'
                                                ? 'success'
                                                : order.status === 'Rejected'
                                                  ? 'error'
                                                  : 'warning'
                                        }
                                    />
                                    <MuiIconButton
                                        sx={{ padding: '0' }}
                                        onClick={(event) => {
                                            event.stopPropagation();

                                            handleToggleOrder(order.id);
                                        }}
                                    >
                                        {isExpanded ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </MuiIconButton>
                                </StatusContainer>
                            </OrderSummary>

                            {isExpanded && (
                                <MuiBox>
                                    <MuiDivider />

                                    <ExpandedContent>
                                        <OrderSummaryCard order={order} />

                                        {canManageOrders ? (
                                            <OwnerOrderPanel
                                                order={order}
                                                onStatusChange={
                                                    handleStatusChange
                                                }
                                            />
                                        ) : (
                                            <CustomerOrderPanel order={order} />
                                        )}
                                    </ExpandedContent>
                                </MuiBox>
                            )}
                        </OrderCard>
                    );
                }}
            />
        </Container>
    );
};
