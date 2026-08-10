import { INPUT_TYPES } from '@components/constants';
import type { TextFieldProps } from '@mui/material';

export type InputType = (typeof INPUT_TYPES)[keyof typeof INPUT_TYPES];

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'type'> {
    type?: InputType;
}
