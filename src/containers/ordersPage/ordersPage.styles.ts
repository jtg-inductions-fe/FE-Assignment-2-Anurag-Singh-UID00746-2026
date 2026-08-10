import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { typography } from '@theme/foundations';

export const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(5),
}));

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    margin: theme.spacing(6, 0, 4, 0),
}));

export const HeaderContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export const OrdersList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    margin: theme.spacing(12, 0),
}));

export const OrderCard = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
    padding: theme.spacing(3),

    [theme.breakpoints.up('tablet')]: {
        padding: theme.spacing(2, 0),
    },
}));

export const OrderSummary = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    padding: theme.spacing(2, 1),
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.15s ease',

    [theme.breakpoints.up('tablet')]: {
        display: 'grid',
        gridTemplateColumns: '1.2fr auto auto auto',
        alignItems: 'space-between',
    },
}));

export const OrderInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
    minWidth: 0,

    [theme.breakpoints.up('tablet')]: {
        marginLeft: typography.typographyUtil.pxToRem(13),
    },
}));

export const OrderIcon = styled(Box)(({ theme }) => ({
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: '50%',
    backgroundColor: alpha(theme.palette.primary.light, 0.5),
    color: theme.palette.primary.main,

    [theme.breakpoints.up('tablet')]: {
        display: 'flex',
    },
}));

export const OrderID = styled(Typography)(({ theme }) => ({
    fontSize: typography.typographyUtil.pxToRem(12),
    color: alpha(theme.palette.common.black, 0.8),
    fontWeight: theme.typography.fontWeightBold,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [theme.breakpoints.up('tablet')]: {
        fontSize: typography.typographyUtil.pxToRem(16),
    },
}));

export const OrderTime = styled(Typography)(({ theme }) => ({
    fontSize: typography.typographyUtil.pxToRem(11),
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: alpha(theme.palette.text.secondary, 0.7),
    fontWeight: theme.typography.fontWeightBold,

    [theme.breakpoints.up('tablet')]: {
        fontSize: typography.typographyUtil.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export const OrderDetails = styled(Box)(({ theme }) => ({
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    maxWidth: typography.typographyUtil.pxToRem(150),

    [theme.breakpoints.up('tablet')]: {
        maxWidth: 'none',
        gap: theme.spacing(1),
    },
}));

export const StatusContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),

    [theme.breakpoints.up('tablet')]: {
        justifyContent: 'center',
        gap: theme.spacing(5),
    },
}));

export const ExpandedContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(3, 0),
    borderTop: `1px solid ${theme.palette.divider}`,

    [theme.breakpoints.up('tablet')]: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: theme.spacing(10),
        alignItems: 'start',
        padding: theme.spacing(6),
    },
}));

export const ItemsSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
}));

export const ItemRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(2),
}));

export const ItemInfo = styled(Box)({
    minWidth: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
});

export const TimelineCard = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.info.light, 0.1),
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4, 6),
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.02)',
}));

export const Timeline = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
    marginTop: theme.spacing(6),
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        left: theme.spacing(1.7),
        top: theme.spacing(1),
        bottom: theme.spacing(3),
        width: '2px',
        backgroundColor: theme.palette.divider,
    },
}));

export const TimelineItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(4),
    position: 'relative',
}));

export const TimelineDot = styled(Box)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop: theme.spacing(0.5),
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.text.disabled}`,
    zIndex: 1,
}));

export const TimelineDotActive = styled(TimelineDot)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
    animation: 'activePulse 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',

    '@keyframes activePulse': {
        '0%, 100%': {
            boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
            transform: 'scale(1)',
        },
        '50%': {
            boxShadow: `0 0 0 5px ${alpha(theme.palette.primary.light, 0.8)}`,
            transform: 'scale(1.15)',
        },
    },
}));

export const TimelineDotCompleted = styled(TimelineDot)(({ theme }) => ({
    backgroundColor: theme.palette.success.light,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.success.light, 0.2)}`,
}));

export const TimelineDotRejected = styled(TimelineDot)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.error.light, 0.9),
    boxShadow: `0 0 0 4px ${alpha(theme.palette.error.light, 0.2)}`,
}));

export const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    marginTop: theme.spacing(8),

    [theme.breakpoints.up('tablet')]: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: theme.spacing(3),
    },
}));

export const TotalSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.text.primary}`,
}));
