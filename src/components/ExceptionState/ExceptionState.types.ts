import { EXCEPTION_STATE_TYPES } from '@components/constants';
import type { BoxProps } from '@mui/material';

export type ExceptionType =
    (typeof EXCEPTION_STATE_TYPES)[keyof typeof EXCEPTION_STATE_TYPES];

/**
 * Represents the type of Exception state's prop.
 */
export interface ExceptionStateProps extends BoxProps {
    /** Variant style or category of the error/empty state display */
    type?: ExceptionType;

    /** Main headline text explaining the error or current state */
    title: string;

    /** Optional secondary message providing extra context or solution steps */
    description?: string;

    /** Optional callback function executed when the user clicks the retry button */
    onRetry?: () => void;
}
