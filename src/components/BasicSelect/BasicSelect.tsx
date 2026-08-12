import { SelectProps } from '@mui/material/Select';
import { StyledBaseSelect } from './BasicSelect.styles';

export const MySelect = (props: SelectProps) => {
    return <StyledBaseSelect {...props}></StyledBaseSelect>;
};
