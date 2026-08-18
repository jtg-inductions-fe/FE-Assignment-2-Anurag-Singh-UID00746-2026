import React, { useState } from 'react';
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
    RejectionModal,
    ModalSurface,
    ActionButtons,
} from './Orders.styles';

import type { Order, OrderStatus } from '@types';
import { ROUTES } from '@router/routes';
import { theme } from '@theme/index';
import { formatOrderDateTime } from '@utils/getFormattedDateTime';
import {
    CustomerOrderPanelProps,
    OrderTimelineItemProps,
    OwnerOrderPanelProps,
    rejectionFormData,
} from './order.types';
import { Controller, useForm } from 'react-hook-form';
import { rejectionSchema } from './order.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderStatusSteps } from './order.constants';
import { ExceptionState } from '@components/ExceptionState';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import { Chip } from '@components/Chip';
import { permission, rolepermissions } from '@containers/common/constants';
import { List } from '@components/List';
import { OrderSummaryCard } from '@components/OrderSummary';

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

const CustomerOrderPanel = ({ order }: CustomerOrderPanelProps) => {
    const isRejected = order.status.trim().toUpperCase() === 'REJECTED';

    const currentStepIndex = orderStatusSteps.findIndex(
        (step) => step === order.status.trim().toUpperCase(),
    );

    return (
        <TimelineCard>
            <MuiTypography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
            >
                ORDER STATUS
            </MuiTypography>

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

            {isRejected && order.rejectionReason && (
                <MuiBox mt={5}>
                    <MuiTypography
                        component="span"
                        variant="caption"
                        color="error.main"
                        fontWeight={theme.typography.fontWeightBold}
                        mb={0.25}
                    >
                        REASON FOR REJECTION
                    </MuiTypography>

                    <MuiTypography
                        component="span"
                        variant="body2"
                        color="primary.main"
                        display="block"
                    >
                        {order.rejectionReason}
                    </MuiTypography>
                </MuiBox>
            )}
        </TimelineCard>
    );
};

const OwnerOrderPanel = ({ order, onStatusChange }: OwnerOrderPanelProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [reason, setReason] = useState('');
    const maxLength = 150;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<rejectionFormData>({
        resolver: yupResolver(rejectionSchema),
        defaultValues: {
            reason: '',
        },
    });

    /**
     * Submits the text explanation for rejecting an order.
     * Clears the input field state, resets the form validation engine, and closes the popup.
     * @param data - The form data containing the rejection reason string text.
     */
    const onRejectSubmit = (data: rejectionFormData) => {
        const trimmedReason = data.reason.trim();

        onStatusChange(order, 'Rejected', trimmedReason);
        setReason('');
        reset({ reason: '' });
        handleClose();
    };

    return (
        <TimelineCard>
            <MuiTypography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
                letterSpacing={1.5}
            >
                MANAGE ORDER
            </MuiTypography>

            <MuiTypography variant="body2" color="text.secondary" mt={1}>
                Current status : {order.status.toUpperCase()}
            </MuiTypography>

            <Actions>
                {order.status === 'Pending' && (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            onClick={() => onStatusChange(order, 'Accepted')}
                        >
                            Accept
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleOpen}
                        >
                            Reject
                        </Button>
                        <RejectionModal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <ModalSurface
                                component="form"
                                onSubmit={handleSubmit(onRejectSubmit)}
                            >
                                <MuiTypography
                                    id="modal-modal-title"
                                    variant="h6"
                                >
                                    Reason for rejection ?
                                </MuiTypography>
                                <Controller
                                    name="reason"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            type="text"
                                            rows={5}
                                            multiline
                                            placeholder="Enter reason for rejecting the order"
                                            required
                                            value={reason}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setReason(e.target.value);
                                            }}
                                            error={Boolean(errors.reason)}
                                            helperText={
                                                errors.reason?.message ??
                                                `${reason.length} / ${maxLength}`
                                            }
                                            slotProps={{
                                                htmlInput: { maxLength: 150 },
                                            }}
                                        />
                                    )}
                                />
                                <ActionButtons>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        type="submit"
                                    >
                                        Reject
                                    </Button>
                                </ActionButtons>
                            </ModalSurface>
                        </RejectionModal>
                    </React.Fragment>
                )}

                {order.status === 'Accepted' && (
                    <Button
                        variant="contained"
                        onClick={() => onStatusChange(order, 'Preparing')}
                    >
                        Start Preparing
                    </Button>
                )}

                {order.status === 'Preparing' && (
                    <Button
                        variant="contained"
                        onClick={() =>
                            onStatusChange(order, 'Out for Delivery')
                        }
                    >
                        Out for Delivery
                    </Button>
                )}

                {order.status === 'Out for Delivery' && (
                    <Button
                        variant="contained"
                        onClick={() => onStatusChange(order, 'Delivered')}
                    >
                        Mark Delivered
                    </Button>
                )}

                {order.status === 'Rejected' && (
                    <Chip label="Order Rejected" color="error" />
                )}

                {order.status === 'Delivered' && (
                    <Chip label="Order Completed" color="success" />
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
    helperText,
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

            <MuiBox sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <MuiTypography
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
                </MuiTypography>

                {helperText && (
                    <MuiTypography
                        variant="caption"
                        color="error.main"
                        sx={{ lineHeight: 1.4, maxWidth: 220 }}
                    >
                        {helperText}
                    </MuiTypography>
                )}
            </MuiBox>
        </TimelineItem>
    );
};
