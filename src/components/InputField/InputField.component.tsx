import { TextFieldProps } from '@mui/material/TextField';
import { StyledTextField } from './InputField.styles';

export const InputField = (props: TextFieldProps) => {
    return <StyledTextField {...props} variant="outlined" />;
};
