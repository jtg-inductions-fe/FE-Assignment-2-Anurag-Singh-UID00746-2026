import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

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

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    h1: {
        fontSize: typographyUtil.pxToRem(40),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: typographyUtil.pxToRem(45),
        color: theme.palette.common.black,

        [theme.breakpoints.up('tablet')]: {
            fontSize: typographyUtil.pxToRem(64),
            lineHeight: typographyUtil.pxToRem(62.5),
        },
    },

    h3: {
        fontSize: typographyUtil.pxToRem(27),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: typographyUtil.pxToRem(45),
        letterSpacing: typographyUtil.pxToRem(1),
        background: 'linear-gradient(180deg, #2b2d42 0%, #4a4e69 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        whiteSpace: 'no-wrap',

        [theme.breakpoints.up('tablet')]: {
            fontSize: typographyUtil.pxToRem(35),
            lineHeight: typographyUtil.pxToRem(55),
        },
    },

    subtitle1: {
        fontSize: typographyUtil.pxToRem(14),
        lineHeight: typographyUtil.pxToRem(23),
        color: theme.palette.text.secondary,
        letterSpacing: typographyUtil.pxToRem(0.5),

        [theme.breakpoints.up('tablet')]: {
            fontSize: typographyUtil.pxToRem(16),
            lineHeight: typographyUtil.pxToRem(25),
        },
    },

    body1: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: theme.typography.fontWeightLight,
        lineHeight: typographyUtil.pxToRem(20),
        letterSpacing: typographyUtil.pxToRem(1),

        [theme.breakpoints.up('tablet')]: {
            lineHeight: typographyUtil.pxToRem(20),
        },
    },

    caption: {
        fontSize: typographyUtil.pxToRem(10),
        fontWeight: theme.typography.fontWeightLight,
        lineHeight: typographyUtil.pxToRem(15),

        [theme.breakpoints.up('tablet')]: {
            fontSize: typographyUtil.pxToRem(12),
            lineHeight: typographyUtil.pxToRem(20),
        },
    },
});

export const typography = { typographyStyle, typographyUtil };
