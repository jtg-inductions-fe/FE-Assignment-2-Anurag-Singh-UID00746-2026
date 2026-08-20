import { SelectProps } from '@mui/material/Select';

import { StyledBaseSelect } from './BasicSelect.styles';

export const Select = (props: SelectProps) => (
    <StyledBaseSelect {...props}>{props.children}</StyledBaseSelect>
);
