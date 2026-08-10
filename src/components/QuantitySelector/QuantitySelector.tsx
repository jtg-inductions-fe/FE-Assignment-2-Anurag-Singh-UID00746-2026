import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import MyButton from '@components/Button/Button';

import {
    ActionButton,
    Container,
    QuantityDisplay,
} from './QuantitySelector.styles';
import { QuantitySelectorProps } from './QuantitySelector.types';

const QuantitySelector = ({
    quantity,
    onIncrement,
    onDecrement,
    disabled = false,
}: QuantitySelectorProps) => {
    if (quantity === 0) {
        return (
            <MyButton
                variant="contained"
                onClick={onIncrement}
                disabled={disabled}
                startIcon={<AddIcon />}
            >
                Add
            </MyButton>
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

export default QuantitySelector;
