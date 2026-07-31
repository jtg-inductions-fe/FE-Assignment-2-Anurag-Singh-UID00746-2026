import { ButtonProps } from '@mui/material';

import { StyledButton } from './Button.styles';

export const MyButton = <C extends React.ElementType>(
    props: ButtonProps<C, { component?: C }>,
) => <StyledButton {...props} />;

export default MyButton;
