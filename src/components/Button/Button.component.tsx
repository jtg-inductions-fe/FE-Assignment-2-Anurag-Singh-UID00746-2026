import { StyledButton } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = ({ ...props }: ButtonProps) => (
    <StyledButton {...props} />
);
