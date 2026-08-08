export type QuantitySelectorProps = {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disabled?: boolean;
};
