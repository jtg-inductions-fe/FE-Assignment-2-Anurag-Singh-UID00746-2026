import { forwardRef } from 'react';

import { ButtonProps } from '@mui/material';

import { StyledButton } from './Button.styles';

export const Button = forwardRef(
    <C extends React.ElementType>(
        props: ButtonProps<C, { component?: C }>,
        ref: React.ForwardedRef<HTMLButtonElement>,
    ) => <StyledButton {...props} ref={ref} />,
);

Button.displayName = 'Button';
