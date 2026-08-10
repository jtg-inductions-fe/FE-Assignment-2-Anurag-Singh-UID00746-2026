export type OrderStatus =
    | 'Pending'
    | 'Accepted'
    | 'Preparing'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Rejected';

export type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

export type Order = {
    id: string;
    restaurantId: string;
    customerId: string;
    items: OrderItem[];
    totalPrice: number;
    date: string;
    status: OrderStatus;
};
