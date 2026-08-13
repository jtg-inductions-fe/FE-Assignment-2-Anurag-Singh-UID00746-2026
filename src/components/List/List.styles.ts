import { ThemeType } from '@components/types';
import { ListItem, styled } from '@mui/material';

export const CustomListItem = styled(ListItem)(({ theme }: ThemeType) => ({
    padding: theme.spacing(3, 0),
}));
