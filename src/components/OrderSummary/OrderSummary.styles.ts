import { ThemeType } from '@components/types';
import { Box, styled } from '@mui/material';

export const ItemsSection = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
}));

export const SectionHeader = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
}));

export const ItemRow = styled(Box)(({ theme }: ThemeType) => ({
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

export const TotalSection = styled(Box)(({ theme }: ThemeType) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.text.primary}`,
}));
