import { Box, LinearProgress, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const StyledToast = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    minWidth: theme.spacing(90),
    maxWidth: theme.spacing(150),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `
        0px 2px 4px ${alpha('#0F172A', 0.02)}, 
        0px 12px 32px ${alpha('#0F172A', 0.06)}, 
        0px 20px 48px ${alpha('#0F172A', 0.04)}
    `,
    padding: theme.spacing(1, 2),
    gap: theme.spacing(2.5),
}));

export const StyledToastImage = styled('img')(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    flexShrink: 0,
    objectFit: 'contain',
}));

export const StyledAtoms = styled('img')(({ theme }) => ({
    width: theme.spacing(14),
    pointerEvents: 'none',
    userSelect: 'none',
    margin: theme.spacing(0, 1),
}));

export const StyledContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    [theme.breakpoints.up('tablet')]: {
        gap: theme.spacing(0),
    },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    letterSpacing: theme.spacing(0.2),
}));

export const StyledMessage = styled(Typography)(({ theme }) => ({
    color: alpha(theme.palette.text.secondary, 0.8),
}));

export const StyledProgress = styled(LinearProgress)(() => ({
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 4,
}));
