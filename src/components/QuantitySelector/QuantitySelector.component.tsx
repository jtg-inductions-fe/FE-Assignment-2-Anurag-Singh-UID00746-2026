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
    quantity,
    onIncrement,
    onDecrement,
    disabled = false,
}: QuantitySelectorProps) => {
    if (quantity === 0) {
        return (
            <Button
                variant="contained"
                onClick={onIncrement}
                disabled={disabled}
                startIcon={<AddIcon />}
            >
                Add
            </Button>
        );
    }

    return (
        <Container>
            <ActionButton onClick={onDecrement} size="small">
                <RemoveIcon fontSize="small" />
            </ActionButton>

            <QuantityDisplay>{quantity}</QuantityDisplay>

            <ActionButton onClick={onIncrement} size="small">
                <AddIcon fontSize="small" />
            </ActionButton>
        </Container>
    );
};
