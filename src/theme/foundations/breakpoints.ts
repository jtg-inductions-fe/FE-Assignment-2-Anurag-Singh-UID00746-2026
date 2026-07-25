import type { BreakpointsOptions } from '@mui/material/styles';

/* Custom Breakpoints */
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false;
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true;
        tablet: true;
        desktop: true;
    }
}

export const breakpoints: BreakpointsOptions = {
    values: {
        mobile: 0,
        tablet: 768,
        desktop: 1024,
    },
};
