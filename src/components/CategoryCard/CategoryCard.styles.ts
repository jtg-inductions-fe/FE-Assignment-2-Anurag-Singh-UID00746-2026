import { ThemeType } from '@components/types';
import { alpha, Box, Card, CardActionArea, styled, Theme } from '@mui/material';

export const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(
    ({ theme, selected }: { theme: Theme; selected?: boolean }) => ({
        position: 'relative',
        borderRadius: 24,
        border: `2px solid ${selected ? alpha(theme.palette.primary.main, 0.5) : alpha(theme.palette.text.secondary, 0.2)}`,
        background: selected
            ? alpha(theme.palette.primary.light, 0.4)
            : theme.palette.common.white,
        boxShadow: 'none',
        padding: 0,
        width: '100%',
    }),
);

export const MyCardActionArea = styled(CardActionArea)(
    ({ theme }: ThemeType) => ({
        padding: theme.spacing(4, 3),
        textAlign: 'center',

        '&:hover .role-image': {
            transform: 'scale(1.06)',
        },
    }),
);

export const MyBadge = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(
    ({ theme, selected }: { theme: Theme; selected?: boolean }) => ({
        position: 'absolute',
        top: 14,
        right: 14,
        width: 34,
        height: 34,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '.25s',
        zIndex: '1000',

        ...(selected
            ? {
                  background: theme.palette.primary.main,
                  color: theme.palette.common.white,
              }
            : {
                  background: theme.palette.common.white,
                  border: `2px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
              }),
    }),
);

export const LogoWrapper = styled(Box)(({ theme }: ThemeType) => ({
    borderRadius: '50%',
    padding: theme.spacing(4),
}));

export const ContentWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));
