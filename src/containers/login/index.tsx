import { ChangeEvent } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { alpha, Box, Stack, Typography } from '@mui/material';

import MyButton from '@components/Button/Button';
import { TOAST_TYPES } from '@components/constants';
import { MyInputField } from '@components/InputField/InputField.component';
import { LoginCredential } from '@features/auth/auth.types';
import { login } from '@features/auth/authThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { typography } from '@theme/foundations';
import { theme } from '@theme/index';
import { loginSchema } from '@validations/auth.validation';

import { CenteredContainer, ClickableLink } from './login.styles';

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginCredential>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading } = useAppSelector((state) => state.auth);

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
        <CenteredContainer maxWidth="tablet" disableGutters>
            <Box
                component="form"
                onSubmit={(e: ChangeEvent<HTMLInputElement>) =>
                    void handleSubmit(onSubmit)(e)
                }
                width="100%"
                maxWidth={typography.typographyUtil.pxToRem(500)}
                paddingInline={7}
            >
                <Stack spacing={10}>
                    <Stack>
                        <Typography variant="h3" textAlign="center">
                            WELCOME BACK
                        </Typography>

                        <Typography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Your delicious meal is just a login away
                        </Typography>
                    </Stack>

                    <Stack spacing={8}>
                        <Stack spacing={2}>
                            <Typography variant="body1">Email</Typography>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <MyInputField
                                        {...field}
                                        placeholder="Enter your email"
                                        fullWidth
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="body1">Password</Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <MyInputField
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        fullWidth
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={8}>
                        <MyButton
                            type="submit"
                            variant="contained"
                            loading={isLoading}
                            fullWidth
                        >
                            {!isLoading && 'login'}
                        </MyButton>

                        <Typography variant="body2" textAlign="center">
                            Don&apos;t have an account ?
                            <ClickableLink
                                component={Link}
                                to="/signup"
                                color="primary"
                                fontWeight="inherit"
                            >
                                Sign Up
                            </ClickableLink>
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </CenteredContainer>
    );
};

export default Login;
