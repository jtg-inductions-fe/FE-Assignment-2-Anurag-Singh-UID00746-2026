import { ThemeType } from '@components/types';
import { styled, ToggleButtonGroup } from '@mui/material';

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
    ({ theme }: ThemeType) => ({
        margin: theme.spacing(8, 0),

        '& .MuiToggleButtonGroup-grouped': {
            '&:first-of-type': {
                borderTopLeftRadius: theme.spacing(3),
                borderBottomLeftRadius: theme.spacing(3),
            },
            '&:last-of-type': {
                borderTopRightRadius: theme.spacing(3),
                borderBottomRightRadius: theme.spacing(3),
            },
        },
    }),
);
