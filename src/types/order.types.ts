/** All possible tracking steps for an order's lifecycle. */
export type OrderStatus =
    | 'Pending'
    | 'Accepted'
    | 'Preparing'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Rejected';

/** A single food item detail inside an order receipt. */
export type OrderItem = {
    /** The unique ID of the ordered item. */
    id: string;

    /** The name of the food item. */
    name: string;

    /** How much a single unit of this item costs. */
    price: number;

    /** The total count of this item bought. */
    quantity: number;
};

/** Complete details of a finalized customer purchase order. */
export type Order = {
    /** The unique tracking ID of the order. */
    id: string;

    /** The ID of the restaurant that prepares the food. */
    restaurantId: string;

    /** The ID of the customer who bought the food. */
    customerId: string;

    /** The list of bought food items. */
    items: OrderItem[];

    /** The final billing price sum for everything in the order. */
    totalPrice: number;

    /** The timestamp date string when the checkout occurred. */
    date: string;

    /** The current live processing status tracking stage of the order. */
    status: OrderStatus;

    /** The text note explaining why an order was turned down, if rejected. */
    rejectionReason?: string | null;
};
