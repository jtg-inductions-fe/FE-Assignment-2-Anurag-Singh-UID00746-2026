import { Box, Button, Divider, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { EXCEPTION_STATE_TYPES } from '@components/constants';
import { ThemeType } from '@components/types';

export const StyledContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: theme.spacing(6, 3),
}));

export const StyledImage = styled('img')(({ theme }: ThemeType) => ({
    width: '100%',
    maxWidth: theme.spacing(60),
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
    marginBottom: theme.spacing(4),
}));

export const StyledTitle = styled(Typography)(({ theme }: ThemeType) => ({
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: theme.spacing(2),
    letterSpacing: theme.spacing(0.3),
    background: 'linear-gradient(180deg, #2b2d42 0%, #4a4e69 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}));

export const StyledDescription = styled(Typography)(({ theme }: ThemeType) => ({
    maxWidth: theme.spacing(90),
    color: alpha(theme.palette.text.secondary, 0.5),
    marginBottom: theme.spacing(4),
}));

export const StyledButton = styled(Button)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(3),
}));

export const StyledDivider = styled(Divider, {
    shouldForwardProp: (prop) => prop !== 'type',
})<{ type: string }>(({ theme, type }) => ({
    height: theme.spacing(5),
    alignSelf: 'center',
    borderColor:
        type === EXCEPTION_STATE_TYPES.ERROR
            ? theme.palette.error.main
            : theme.palette.primary.main,
}));
