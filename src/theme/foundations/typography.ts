import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

import { FONT_WEIGHTS } from './constants';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: FONT_WEIGHTS.LIGHT,
    fontWeightRegular: FONT_WEIGHTS.REGULAR,
    fontWeightMedium: FONT_WEIGHTS.MEDIUM,

    h1: {
        fontSize: theme.typography.pxToRem(40),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: theme.typography.pxToRem(45),
        color: theme.palette.common.black,

        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(64),
            lineHeight: theme.typography.pxToRem(62.5),
        },
    },

    h3: {
        fontSize: theme.typography.pxToRem(30),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: theme.typography.pxToRem(45),
        letterSpacing: theme.typography.pxToRem(1),
        color: theme.palette.text.primary,

        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(40),
            lineHeight: theme.typography.pxToRem(62.5),
        },
    },

    subtitle1: {
        fontSize: theme.typography.pxToRem(14),
        lineHeight: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        letterSpacing: theme.typography.pxToRem(0.5),

        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(16),
            lineHeight: theme.typography.pxToRem(20),
        },
    },

    body1: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightLight,
        lineHeight: theme.typography.pxToRem(15),

        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(14),
            lineHeight: theme.typography.pxToRem(20),
        },
    },

    caption: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: theme.typography.fontWeightLight,
        lineHeight: theme.typography.pxToRem(15),

        [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(12),
            lineHeight: theme.typography.pxToRem(20),
        },
    },
});

export const typography = { typographyStyle, typographyUtil };
