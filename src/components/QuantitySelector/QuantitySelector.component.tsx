import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
    ActionButton,
    Container,
    QuantityDisplay,
} from './QuantitySelector.styles';
import { QuantitySelectorProps } from './QuantitySelector.types';
import { Button } from '@components/Button';

export const QuantitySelector = ({
    disabled = false,
    ...props
}: QuantitySelectorProps) => {
    if (props.quantity === 0) {
        return (
            <Button
                variant="contained"
                onClick={props.onIncrement}
                disabled={disabled}
                startIcon={<AddIcon />}
                aria-label="Add item"
            >
                Add
            </Button>
        );
    }

    return (
        <Container>
            <ActionButton
                onClick={props.onDecrement}
                size="small"
                aria-label="Decrease quantity"
            >
                <RemoveIcon fontSize="small" />
            </ActionButton>

            <QuantityDisplay>{props.quantity}</QuantityDisplay>

            <ActionButton
                onClick={props.onIncrement}
                size="small"
                aria-label="Increase quantity"
            >
                <AddIcon fontSize="small" />
            </ActionButton>
        </Container>
    );
};
