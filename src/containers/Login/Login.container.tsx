import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    alpha,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import { TOAST_TYPES } from '@components/constants';
import { LoginCredential } from '@features/auth/auth.types';
import { login } from '@features/auth/authThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { theme } from '@theme/index';
import { loginSchema } from '@validations/auth.validation';

import { InputField } from '@components/InputField';
import { Button } from '@components/Button';
import { CenteredContainer, LoginForm } from './Login.styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    IconButton as MuiIconButton,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { Link } from '@components/Link';

export const Login = () => {
    const form = useForm<LoginCredential>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);

    /**
     * Submits the user login credentials to the backend.
     * On success, shows a notification and redirects the user to the home page.
     * @param data - The user's login email and password credentials.
     */
    const onSubmit = async (data: LoginCredential) => {
        try {
            await dispatch(login(data)).unwrap();
            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Login successful !!',
                }),
            );
            await navigate(ROUTES.ROOT);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Login Failed',
                    message: error as string,
                }),
            );
        }
    };

    return (
        <CenteredContainer maxWidth="sm" disableGutters>
            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <MuiStack spacing={10}>
                    <MuiStack>
                        <MuiTypography variant="h3" textAlign="center">
                            WELCOME BACK
                        </MuiTypography>

                        <MuiTypography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Your delicious meal is just a login away
                        </MuiTypography>
                    </MuiStack>
                    <MuiStack spacing={8}>
                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">Email</MuiTypography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your email"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Password
                            </MuiTypography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <MuiInputAdornment position="end">
                                                        <MuiIconButton
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword,
                                                                )
                                                            }
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </MuiIconButton>
                                                    </MuiInputAdornment>
                                                ),
                                            },
                                        }}
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </MuiStack>
                    </MuiStack>

                    <MuiStack spacing={8}>
                        <Button
                            type="submit"
                            variant="contained"
                            loading={isLoading}
                            fullWidth
                        >
                            {!isLoading && 'login'}
                        </Button>

                        <MuiTypography variant="body2" textAlign="center">
                            Don&apos;t have an account ?
                            <Link href={ROUTES.AUTH.SIGNUP} color="primary">
                                Sign Up
                            </Link>
                        </MuiTypography>
                    </MuiStack>
                </MuiStack>
            </LoginForm>
        </CenteredContainer>
    );
};
