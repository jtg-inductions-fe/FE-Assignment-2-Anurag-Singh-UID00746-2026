import { forwardRef } from 'react';

import { ButtonProps } from '@mui/material';

import { StyledButton } from './Button.styles';

export const MyButton = forwardRef(
    <C extends React.ElementType>(
        props: ButtonProps<C, { component?: C }>,
        ref: React.ForwardedRef<HTMLButtonElement>,
    ) => <StyledButton {...props} ref={ref} />,
);

MyButton.displayName = 'MyButton';

export default MyButton;
