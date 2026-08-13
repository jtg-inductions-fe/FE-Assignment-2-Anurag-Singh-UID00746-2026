import { ThemeType } from '@components/types';
import { Z_INDEX } from '@constant/theme';
import { Box, Card, CardContent, Chip, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { typography } from '@theme/foundations';

export const StyledCard = styled(Card)(({ theme }: ThemeType) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: theme.spacing(4),
    cursor: 'pointer',
    backgroundColor: theme.palette.common.white,
    filter: 'drop-shadow(rgba(27, 30, 36, 0.08) 0px 0px 7.905px)',
    border: '1px solid rgba(2, 6, 12, 0.08)',
    maxHeight: typography.typographyUtil.pxToRem(392),
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        transform: 'scale(1.02)',
    },
}));

export const StyledCardContent = styled(CardContent)(
    ({ theme }: ThemeType) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        padding: theme.spacing(3),
    }),
);

export const InfoContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

export const MetaContainer = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(25, 118, 210, 0.04)',
    border: `1px solid rgba(25, 118, 210, 0.08)`,
    padding: theme.spacing(2),
    borderRadius: 10,

    '& .MuiTypography-root': {
        color: theme.palette.text.primary,
    },
    '& .meta-highlight': {
        color: theme.palette.primary.main,
    },
}));

export const ActionContainer = styled(Box)(({ theme }: ThemeType) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    zIndex: Z_INDEX,
}));

export const StyledIconButton = styled(IconButton)(({ theme }: ThemeType) => ({
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderRadius: '50%',
    height: theme.spacing(10),
    width: theme.spacing(10),
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        transform: 'scale(1.1)',
    },

    '&:focus-visible': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        outline: 'none',
    },
}));

export const ClosedBadge = styled(Chip)(({ theme }: ThemeType) => ({
    backgroundColor: alpha(theme.palette.error.main, 0.6),
    borderRadius: typography.typographyUtil.pxToRem(10),
    color: theme.palette.common.white,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.04)',
    backdropFilter: 'blur(12px)',
    textTransform: 'uppercase',
    position: 'absolute',
    paddingBottom: theme.spacing(0.5),
    top: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: Z_INDEX,
}));

export const ImageContainer = styled(Box)(() => ({
    position: 'relative',
    width: '100%',
}));

export const Overlay = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.common.black, 0.5),
    position: 'absolute',
    top: theme.spacing(0),
    left: theme.spacing(0),
    width: '100%',
    height: typography.typographyUtil.pxToRem(250),
}));

export const OverlayContent = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
}));

export const IconWrapper = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: theme.spacing(5),
    backgroundColor: alpha(theme.palette.common.black, 0.2),
    backdropFilter: 'blur(12px)',
}));

export const HeaderBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));
