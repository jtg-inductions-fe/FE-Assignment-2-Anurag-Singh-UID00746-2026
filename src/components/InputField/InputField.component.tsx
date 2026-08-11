import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    IconButton as MuiIconButton,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';

import { StyledTextField } from './InputField.styles';
import { InputProps } from './InputField.types';
import { INPUT_TYPES } from '../constants';

export const InputField = ({ type, ...restProps }: InputProps) => {
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
                <MuiInputAdornment position="end">
                    <MuiIconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </MuiIconButton>
                </MuiInputAdornment>
            );
        }

        return adornments;
    };

    return (
        <StyledTextField
            slotProps={{
                input: {
                    ...getInputAdornments(),
                },
            }}
            {...restProps}
            type={getInputType()}
            variant="outlined"
        />
    );
};
