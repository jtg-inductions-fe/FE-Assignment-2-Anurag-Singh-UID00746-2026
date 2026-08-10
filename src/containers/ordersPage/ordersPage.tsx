import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { alpha, Divider, IconButton, Typography } from '@mui/material';

import { EXCEPTION_STATE_TYPES, TOAST_TYPES } from '@components/constants';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import { updateOrderStatusThunk } from '@features/orders/orderThunk';
import { showToast } from '@features/toast/toastSlice';

import {
    Container,
    Header,
    HeaderContent,
    OrdersList,
    OrderCard,
    OrderSummary,
    OrderInfo,
    OrderIcon,
    OrderDetails,
    StatusContainer,
    ExpandedContent,
    ItemsSection,
    SectionHeader,
    ItemRow,
    ItemInfo,
    TotalSection,
    TimelineCard,
    Timeline,
    TimelineItem,
    TimelineDot,
    TimelineDotActive,
    TimelineDotCompleted,
    TimelineDotRejected,
    Actions,
    OrderID,
    OrderTime,
} from './ordersPage.styles';

import type { Order, OrderStatus } from '../../types/order.types';
import { rolePermissions } from '@config/rolePermissions';
import { USER_ROLE } from '../../types/user.types';
import { Permission } from '@config/permissions';
import MyButton from '@components/Button/Button';
import { ROUTES } from '@router/routes';
import { theme } from '@theme/index';
import Badge from '@components/Badge/Badge';
import { formatOrderDateTime } from '@utils/getFormattedDateTime';
import {
    CustomerOrderPanelProps,
    orderStatusSteps,
    OrderTimelineItemProps,
    OwnerOrderPanelProps,
} from './orderPage.types';
import ExceptionState from '@components/ExceptionState/ExceptionState';

const OrdersPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const orders = useAppSelector((state) => state.order.orders);
    const { user } = useAppSelector((state) => state.auth);

    const userRole = user?.role;

    const permissions = rolePermissions[userRole || USER_ROLE.GUEST];
    const canManageOrders = permissions.includes(Permission.MANAGE_ORDERS);

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    if (orders.length === 0) {
        return (
            <ExceptionState
                type={EXCEPTION_STATE_TYPES.EMPTY}
                title="Orders not found"
                description="We couldn't find any orders."
            />
        );
    }

    const handleToggleOrder = (orderId: string) => {
        setExpandedOrderId((currentId) =>
            currentId === orderId ? null : orderId,
        );
    };

    const handleStatusChange = async (order: Order, status: OrderStatus) => {
        try {
            await dispatch(
                updateOrderStatusThunk({
                    order,
                    status,
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
        <Container
            padding={{ mobile: theme.spacing(5), tablet: theme.spacing(4, 0) }}
        >
            <MyButton
                variant="outlined"
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => void navigate(ROUTES.ROOT)}
            >
                Back
            </MyButton>
            <Header>
                <HeaderContent>
                    <Typography variant="h3">
                        {userRole === USER_ROLE.CUSTOMER
                            ? 'MY ORDERS'
                            : 'MANAGE ORDERS'}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color={alpha(theme.palette.text.secondary, 0.8)}
                    >
                        {userRole === USER_ROLE.CUSTOMER
                            ? 'View and track all your orders in one place'
                            : 'Track and manage all your orders in one place'}
                    </Typography>
                </HeaderContent>
            </Header>

            <OrdersList>
                {orders.map((order) => {
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
                                    <Typography
                                        variant="subtitle1"
                                        color="common.black"
                                    >
                                        ₹{order.totalPrice}
                                    </Typography>
                                    <Badge
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
                                    <IconButton
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
                                    </IconButton>
                                </StatusContainer>
                            </OrderSummary>

                            {isExpanded && (
                                <React.Fragment>
                                    <Divider />

                                    <ExpandedContent>
                                        <ItemsSection>
                                            <SectionHeader>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={
                                                        theme.typography
                                                            .fontWeightBold
                                                    }
                                                    color={
                                                        theme.palette.common
                                                            .black
                                                    }
                                                >
                                                    ORDER ITEMS
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {order.items.length}{' '}
                                                    {order.items.length > 1
                                                        ? 'items'
                                                        : 'item'}
                                                </Typography>
                                            </SectionHeader>

                                            <Divider />

                                            {order.items.map((item) => (
                                                <ItemRow key={item.id}>
                                                    <ItemInfo>
                                                        <Typography
                                                            variant="body1"
                                                            fontWeight={
                                                                theme.typography
                                                                    .fontWeightBold
                                                            }
                                                            color={alpha(
                                                                theme.palette
                                                                    .common
                                                                    .black,
                                                                0.7,
                                                            )}
                                                        >
                                                            {item.name.toUpperCase()}{' '}
                                                            × {item.quantity}
                                                        </Typography>
                                                    </ItemInfo>

                                                    <Typography
                                                        variant="body1"
                                                        fontWeight={
                                                            theme.typography
                                                                .fontWeightMedium
                                                        }
                                                    >
                                                        ₹
                                                        {item.price *
                                                            item.quantity}
                                                    </Typography>
                                                </ItemRow>
                                            ))}

                                            <TotalSection>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={
                                                        theme.typography
                                                            .fontWeightBold
                                                    }
                                                    color={
                                                        theme.palette.common
                                                            .black
                                                    }
                                                    letterSpacing={2}
                                                >
                                                    TOTAL
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    color="primary"
                                                >
                                                    ₹{order.totalPrice}
                                                </Typography>
                                            </TotalSection>
                                        </ItemsSection>

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
                                </React.Fragment>
                            )}
                        </OrderCard>
                    );
                })}
            </OrdersList>
        </Container>
    );
};

const CustomerOrderPanel = ({ order }: CustomerOrderPanelProps) => {
    const isRejected = order.status.trim().toUpperCase() === 'REJECTED';

    const currentStepIndex = orderStatusSteps.findIndex(
        (step) => step === order.status.trim().toUpperCase(),
    );

    return (
        <TimelineCard>
            <Typography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
            >
                ORDER STATUS
            </Typography>

            {isRejected ? (
                <Timeline>
                    <OrderTimelineItem label="PENDING" completed />

                    <OrderTimelineItem label="REJECTED" rejected />
                </Timeline>
            ) : (
                <Timeline>
                    <OrderTimelineItem
                        label="PENDING"
                        active={currentStepIndex === 0}
                        completed={currentStepIndex > 0}
                    />

                    <OrderTimelineItem
                        label="ACCEPTED"
                        active={currentStepIndex === 1}
                        completed={currentStepIndex > 1}
                    />

                    <OrderTimelineItem
                        label="PREPARING"
                        active={currentStepIndex === 2}
                        completed={currentStepIndex > 2}
                    />

                    <OrderTimelineItem
                        label="OUT FOR DELIVERY"
                        active={currentStepIndex === 3}
                        completed={currentStepIndex > 3}
                    />

                    <OrderTimelineItem
                        label="DELIVERED"
                        active={currentStepIndex === 4}
                        completed={currentStepIndex >= 4}
                    />
                </Timeline>
            )}
        </TimelineCard>
    );
};

const OwnerOrderPanel = ({ order, onStatusChange }: OwnerOrderPanelProps) => {
    return (
        <TimelineCard>
            <Typography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
                letterSpacing={1.5}
            >
                MANAGE ORDER
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
                Current status : {order.status.toUpperCase()}
            </Typography>

            <Actions>
                {order.status === 'Pending' && (
                    <React.Fragment>
                        <MyButton
                            variant="contained"
                            onClick={() => onStatusChange(order, 'Accepted')}
                        >
                            Accept
                        </MyButton>

                        <MyButton
                            variant="outlined"
                            color="error"
                            onClick={() => onStatusChange(order, 'Rejected')}
                        >
                            Reject
                        </MyButton>
                    </React.Fragment>
                )}

                {order.status === 'Accepted' && (
                    <MyButton
                        variant="contained"
                        onClick={() => onStatusChange(order, 'Preparing')}
                    >
                        Start Preparing
                    </MyButton>
                )}

                {order.status === 'Preparing' && (
                    <MyButton
                        variant="contained"
                        onClick={() =>
                            onStatusChange(order, 'Out for Delivery')
                        }
                    >
                        Out for Delivery
                    </MyButton>
                )}

                {order.status === 'Out for Delivery' && (
                    <MyButton
                        variant="contained"
                        onClick={() => onStatusChange(order, 'Delivered')}
                    >
                        Mark Delivered
                    </MyButton>
                )}

                {order.status === 'Rejected' && (
                    <Badge label="Order Rejected" color="error" />
                )}

                {order.status === 'Delivered' && (
                    <Badge label="Order Completed" color="success" />
                )}
            </Actions>
        </TimelineCard>
    );
};

const OrderTimelineItem = ({
    label,
    active = false,
    completed = false,
    rejected = false,
}: OrderTimelineItemProps) => {
    return (
        <TimelineItem>
            {rejected ? (
                <TimelineDotRejected />
            ) : completed ? (
                <TimelineDotCompleted />
            ) : active ? (
                <TimelineDotActive />
            ) : (
                <TimelineDot />
            )}

            <Typography
                variant="body2"
                fontWeight={
                    active || completed || rejected
                        ? theme.typography.fontWeightBold
                        : theme.typography.fontWeightRegular
                }
                color={
                    rejected
                        ? 'error'
                        : active || completed
                          ? 'text.primary'
                          : 'text.secondary'
                }
            >
                {label}
            </Typography>
        </TimelineItem>
    );
};

export default OrdersPage;
