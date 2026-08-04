import { ToggleButtonGroupProps } from '@mui/material';
import { StyledToggleButtonGroup } from './MultiToggle.styles';

const MultiToggle = ({ children, ...props }: ToggleButtonGroupProps) => {
    return (
        <StyledToggleButtonGroup {...props}>{children}</StyledToggleButtonGroup>
    );
};

export default MultiToggle;
