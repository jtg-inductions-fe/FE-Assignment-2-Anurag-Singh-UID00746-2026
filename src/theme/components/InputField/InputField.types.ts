import type { TextFieldProps } from '@mui/material';

import { INPUT_TYPES } from '../constants';

export type InputType = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
    type?: InputType;
}
