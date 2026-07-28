import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    alpha,
    IconButton,
    InputAdornment,
    styled,
    TextField,
} from '@mui/material';

import { InputProps } from './InputField.types';
import { typography } from '../../foundations';
import { INPUT_TYPES } from '../constants';

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',

    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(theme.palette.secondary.light, 0.2),
        transition: 'all 0.2s ease-in-out',

        '& fieldset': {
            borderColor: theme.palette.secondary.light,
            borderWidth: typography.typographyUtil.pxToRem(1),
        },
        '&:hover fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
            borderWidth: typography.typographyUtil.pxToRem(1.5),
        },
        '& input': {
            color: alpha(theme.palette.common.black, 0.8),
            fontSize: typography.typographyUtil.pxToRem(14),
            padding: theme.spacing(3, 2),

            '&::placeholder': {
                color: alpha(theme.palette.text.secondary, 0.5),
                letterSpacing: typography.typographyUtil.pxToRem(0.2),
                opacity: 1,
            },
        },
    },

    '& .MuiFormHelperText-root': {
        marginLeft: typography.typographyUtil.pxToRem(2),
        marginTop: typography.typographyUtil.pxToRem(8),
    },

    '& .MuiFormHelperText-root.Mui-error': {
        fontSize: typography.typographyUtil.pxToRem(14),
    },
}));

export const MyInputField = ({ type, ...restProps }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const getInputType = () => {
        if (type === INPUT_TYPES.PASSWORD)
            return showPassword ? INPUT_TYPES.TEXT : INPUT_TYPES.PASSWORD;
        return type;
    };

    const getInputAdornments = () => {
        const adornments: {
            endAdornment?: React.ReactNode;
        } = {};

        if (type === INPUT_TYPES.PASSWORD) {
            adornments.endAdornment = (
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            );
        }

        return adornments;
    };

    return (
        <StyledTextField
            {...restProps}
            type={getInputType()}
            variant="outlined"
            slotProps={{
                input: {
                    ...getInputAdornments(),
                },
            }}
        />
    );
};
