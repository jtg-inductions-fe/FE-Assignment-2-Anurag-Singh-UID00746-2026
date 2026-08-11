import { ToggleButtonGroupProps } from '@mui/material';
import { StyledToggleButtonGroup } from './MultiToggle.styles';

const MultiToggle = (props: ToggleButtonGroupProps) => {
    return (
        <StyledToggleButtonGroup {...props}>
            {props.children}
        </StyledToggleButtonGroup>
    );
};

export default MultiToggle;
