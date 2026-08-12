import { Order } from '@types';

export type OrderState = {
    /** The list of all products ordered. */
    orders: Order[];

    /**
     * True if currently loading.
     */
    loading: boolean;

    /**
     * A text message explaining what went wrong.
     * This is null if there are no errors.
     */
    error: string | null;
};
