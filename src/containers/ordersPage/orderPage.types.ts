import { Order, OrderStatus } from '../../types/order.types';

export type CustomerOrderPanelProps = {
    order: Order;
};

export type OwnerOrderPanelProps = {
    order: Order;
    onStatusChange: (order: Order, status: OrderStatus) => void;
};

export type OrderTimelineItemProps = {
    label: string;
    active?: boolean;
    completed?: boolean;
    rejected?: boolean;
};

export const orderStatusSteps = [
    'PENDING',
    'ACCEPTED',
    'PREPARING',
    'OUT FOR DELIVERY',
    'DELIVERED',
] as const;
