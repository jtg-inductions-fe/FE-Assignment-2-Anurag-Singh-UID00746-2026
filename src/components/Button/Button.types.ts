import { ButtonProps as MuiButtonProps } from '@mui/material';
import { ElementType } from 'react';

/**
 * Represents the type of Button's prop.
 */
export interface ButtonProps extends MuiButtonProps {
    /** Optional component prop to make the button behave like the component */
    component?: ElementType;
}
