import { ToggleButtonGroupProps } from '@mui/material';

import { StyledToggleButtonGroup } from './MultiToggle.styles';

export const ToggleButtonGroup = (props: ToggleButtonGroupProps) => (
    <StyledToggleButtonGroup {...props}>
        {props.children}
    </StyledToggleButtonGroup>
);
