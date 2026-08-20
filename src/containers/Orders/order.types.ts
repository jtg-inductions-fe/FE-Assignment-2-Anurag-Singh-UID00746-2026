import { Order, OrderStatus } from '@types';
import { ReactNode } from 'react';

/** Props for the customer-facing order view dashboard details panel. */
export type CustomerOrderPanelProps = {
    /** The active order data object containing tracking status milestones and items. */
    order: Order;
};

/** Props for the store owner order administration panel interface. */
export type OwnerOrderPanelProps = {
    /** The incoming or active order data object awaiting merchant actions. */
    order: Order;

    /**
     * Callback triggered when a merchant updates the lifecycle status state of an order.
     * @param order - The targeted order data object.
     * @param status - The new lifecycle state milestone to apply.
     * @param reason - The optional explanatory text reason if the status is set to rejected.
     */
    onStatusChange: (
        order: Order,
        status: OrderStatus,
        reason?: string,
    ) => void;
};

/** Props for a single tracking checkpoint step node within the order progress timeline. */
export type OrderTimelineItemProps = {
    /** The text heading label describing the timeline step activity. */
    label: string;

    /** Toggles the highlighted pulse accent color state indicating current location focus. */
    active?: boolean;

    /** Marks the tracking step indicator badge node as visually checked or successfully completed. */
    completed?: boolean;

    /** Swaps standard active step colors into error layouts when a step choice fails or gets cancelled. */
    rejected?: boolean;

    /** Small auxiliary description sub-text displayed directly underneath the heading title node. */
    helperText?: string;

    /** Optional inner content blocks or sub-rows nested within the timeline layout element space. */
    children?: ReactNode;
};

/** Form interface definition used for capturing reasons within order rejection panels. */
export type rejectionFormData = {
    /** The text description typed out by a merchant clarifying why an order cannot be processed. */
    reason: string;
};
