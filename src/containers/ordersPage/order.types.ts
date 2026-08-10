import { Order, OrderStatus } from '@types';
import { ReactNode } from 'react';

export type CustomerOrderPanelProps = {
    order: Order;
};

export type OwnerOrderPanelProps = {
    order: Order;
    onStatusChange: (
        order: Order,
        status: OrderStatus,
        reason?: string,
    ) => void;
};

export type OrderTimelineItemProps = {
    label: string;
    active?: boolean;
    completed?: boolean;
    rejected?: boolean;
    helperText?: string;
    children?: ReactNode;
};

export type rejectionFormData = {
    reason: string;
};
