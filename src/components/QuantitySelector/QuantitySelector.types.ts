/** Props for the QuantitySelector counter component. */
export type QuantitySelectorProps = {
    /** The current active numeric value to display. */
    quantity: number;

    /** Callback triggered when the plus button is clicked. */
    onIncrement: () => void;

    /** Callback triggered when the minus button is clicked. */
    onDecrement: () => void;

    /** Disables interactive buttons to prevent adjustment updates. */
    disabled?: boolean;
};
