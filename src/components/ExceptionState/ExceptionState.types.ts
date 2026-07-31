import type { BoxProps } from '@mui/material';

import { EXCEPTION_STATE_TYPES } from '../constants';

export type ExceptionType =
    (typeof EXCEPTION_STATE_TYPES)[keyof typeof EXCEPTION_STATE_TYPES];

export interface ExceptionStateProps extends BoxProps {
    type?: ExceptionType;
    title: string;
    description?: string;
}
