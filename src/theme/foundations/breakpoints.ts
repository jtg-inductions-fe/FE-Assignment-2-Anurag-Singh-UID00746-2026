import type { BreakpointsOptions } from '@mui/material/styles';

import { BREAKPOINTS } from './constants';

/* Custom Breakpoints */
export const breakpoints: BreakpointsOptions = {
    values: {
        xs: BREAKPOINTS.EXTRA_SMALL,
        sm: BREAKPOINTS.SMALL,
        md: BREAKPOINTS.MEDIUM,
        lg: BREAKPOINTS.LARGE,
        xl: BREAKPOINTS.EXTRA_LARGE,
    },
};
