import { alpha,Button, styled } from '@mui/material';

import { CustomButtonProps } from './Button.types';

const StyledButton = styled(Button)(({ theme }) => ({
    paddingInline: theme.spacing(4),
    minHeight: theme.spacing(10),

    '&.MuiButton-contained': {
        boxShadow:
            '0px 2px 8px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.04)',

        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
    },

    '&.MuiButton-text': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: theme.palette.primary.dark,
        },

        '&:active': {
            backgroundColor: alpha(theme.palette.primary.main, 0.14),
        },
    },

    '&.Mui-disabled': {
        transform: 'none',
        boxShadow: 'none',
        opacity: 0.5,
    },
}));

const MyButton = ({
    children,
    disableElevation = true,
    ...props
}: CustomButtonProps) => (
        <StyledButton disableElevation={disableElevation} {...props}>
            {children}
        </StyledButton>
    );

export default MyButton;
