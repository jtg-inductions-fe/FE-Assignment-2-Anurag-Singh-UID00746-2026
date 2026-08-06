import { SelectProps } from '@mui/material/Select';
import { StyledBaseSelect } from './BasicSelect.styles';

export const MySelect = ({
    children,
    value,
    onChange,
    ...props
}: SelectProps) => {
    return (
        <StyledBaseSelect value={value} onChange={onChange} {...props}>
            {children}
        </StyledBaseSelect>
    );
};
