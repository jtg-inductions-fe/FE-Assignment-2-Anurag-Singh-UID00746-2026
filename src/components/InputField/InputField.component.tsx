import { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

import { StyledTextField } from './InputField.styles';
import { InputProps } from './InputField.types';
import { INPUT_TYPES } from '@components/constants';

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
