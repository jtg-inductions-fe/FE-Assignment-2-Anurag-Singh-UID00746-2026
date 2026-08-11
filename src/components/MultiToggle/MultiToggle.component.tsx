import { ToggleButtonGroupProps } from '@mui/material';

import { StyledToggleButtonGroup } from './MultiToggle.styles';

export const ToggleButtonGroup = ({
    children,
    ...props
}: ToggleButtonGroupProps) => (
    <StyledToggleButtonGroup {...props}>{children}</StyledToggleButtonGroup>
);
