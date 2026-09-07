import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    width: '100%',
    padding: theme.spacing(3),
    marginTop: theme.spacing(15),

    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0),
    },
}));

export const PageHeader = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
}));

export const HeaderContent = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

export const PageTitle = styled(Typography)(() => ({
    fontWeight: 700,
}));

export const PageDescription = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

export const AddressDetails = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),
}));

export const AddressCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
    },
}));

export const AddressContent = styled(Stack)(({ theme }) => ({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
    padding: theme.spacing(2),

    '& .MuiTypography-body1': {
        color: theme.palette.text.secondary,
        lineHeight: 1.5,
    },
}));

export const AddressHeader = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.5,
}));

export const AddressActions = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(3),

    '& .MuiIconButton-root': {
        width: 44,
        height: 44,
        backgroundColor: theme.palette.action.hover,
    },

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const EmptyState = styled(Stack)(({ theme }) => ({
    minHeight: 320,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    border: `1px dashed ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
}));

export const EmptyStateIcon = styled(Box)(({ theme }) => ({
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.action.hover,

    '& svg': {
        fontSize: 34,
        color: theme.palette.text.secondary,
    },
}));

export const EmptyStateText = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),

    '& .MuiTypography-h6': {
        fontWeight: 600,
    },

    '& .MuiTypography-body2': {
        color: theme.palette.text.secondary,
    },
}));
