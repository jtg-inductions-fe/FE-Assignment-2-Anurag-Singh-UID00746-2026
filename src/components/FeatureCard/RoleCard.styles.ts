import { ThemeType } from '@components/types';
import { alpha, Box, Card, CardActionArea, styled } from '@mui/material';

import { typography } from '@theme/foundations';
import { Z_INDEX } from '@constant/theme';

export const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
    position: 'relative',
    borderRadius: typography.typographyUtil.pxToRem(24),
    border: `2px solid ${selected ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.text.secondary, 0.2)}`,
    background: selected
        ? alpha(theme.palette.primary.light, 0.4)
        : theme.palette.common.white,
    boxShadow: 'none',
    padding: 0,
    width: '100%',
}));

export const MyCardActionArea = styled(CardActionArea)(
    ({ theme }: ThemeType) => ({
        padding: theme.spacing(4, 3),
        textAlign: 'center',

        '& .role-image': {
            transition: 'transform 0.3s ease-in-out',
        },

        '&:hover .role-image': {
            transform: 'scale(1.06)',
        },
    }),
);

export const ImgBox = styled(Box)(({ theme }: ThemeType) => ({
    height: typography.typographyUtil.pxToRem(120),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        height: typography.typographyUtil.pxToRem(150),
        width: '95%',
    },
}));

export const CheckBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
    position: 'absolute',
    top: typography.typographyUtil.pxToRem(14),
    right: typography.typographyUtil.pxToRem(14),
    width: typography.typographyUtil.pxToRem(34),
    height: typography.typographyUtil.pxToRem(34),
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.25s',
    zIndex: Z_INDEX,

    ...(selected
        ? {
              background: theme.palette.primary.main,
              color: theme.palette.common.white,
          }
        : {
              background: theme.palette.common.white,
              border: `2px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
          }),
}));
