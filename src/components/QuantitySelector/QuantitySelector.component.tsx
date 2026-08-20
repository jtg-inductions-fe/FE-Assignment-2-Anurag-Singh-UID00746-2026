import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
    ActionButton,
    Container,
    QuantityDisplay,
} from './QuantitySelector.styles';
import { QuantitySelectorProps } from './QuantitySelector.types';

export const QuantitySelector = (props: QuantitySelectorProps) => {
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
