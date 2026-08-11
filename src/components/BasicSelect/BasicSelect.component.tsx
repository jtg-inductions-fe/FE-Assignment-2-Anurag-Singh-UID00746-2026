import { SelectProps } from '@mui/material/Select';

import { StyledBaseSelect } from './BasicSelect.styles';

export const Select = ({
    children,
    value,
    onChange,
    ...props
}: SelectProps) => (
    <StyledBaseSelect value={value} onChange={onChange} {...props}>
        {children}
    </StyledBaseSelect>
);
