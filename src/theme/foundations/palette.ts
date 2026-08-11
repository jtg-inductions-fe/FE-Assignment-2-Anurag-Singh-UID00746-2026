import type { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '@constant/index';

/* Custom Palette */
export const palette: PaletteOptions = {
    common: {
        white: COLORS.COMMON.WHITE,
        black: COLORS.COMMON.BLACK,
    },

    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
    },

    secondary: {
        main: COLORS.SECONDARY.MAIN,
        light: COLORS.SECONDARY.LIGHT,
    },

    info: {
        main: COLORS.INFO.MAIN,
        light: COLORS.INFO.LIGHT,
    },

    error: {
        main: COLORS.ERROR.MAIN,
        light: COLORS.ERROR.LIGHT,
    },

    warning: {
        main: COLORS.WARNING.MAIN,
        light: COLORS.WARNING.LIGHT,
    },

    success: {
        main: COLORS.SUCCESS.MAIN,
        light: COLORS.SUCCESS.LIGHT,
    },

    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
        disabled: COLORS.TEXT.DISABLED,
    },

    divider: COLORS.DIVIDER,

    background: {
        paper: COLORS.BACKGROUND.PAPER,
    },
};
