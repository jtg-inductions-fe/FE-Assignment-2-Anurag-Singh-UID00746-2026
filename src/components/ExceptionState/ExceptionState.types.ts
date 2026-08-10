import { EXCEPTION_STATE_TYPES } from '@components/constants';
import type { BoxProps } from '@mui/material';

export type ExceptionType =
    (typeof EXCEPTION_STATE_TYPES)[keyof typeof EXCEPTION_STATE_TYPES];

export interface ExceptionStateProps extends BoxProps {
    type?: ExceptionType;
    title: string;
    description?: string;
}
