import type { TextFieldProps } from '@mui/material';

import { INPUT_TYPES } from '../constants';

export type InputType = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];

/**
 * Represents the type of Input's prop.
 */
export interface InputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
    /** Optional type of the input field */
    type?: InputType;
}
