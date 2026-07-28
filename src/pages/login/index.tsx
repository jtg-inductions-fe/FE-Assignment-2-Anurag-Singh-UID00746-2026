import { Controller, useForm } from 'react-hook-form';

import { alpha,Box, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { theme } from '@theme';

import { CenteredContainer, ClickableLink } from './login.styles';
import { LoginCredential } from '../../features/auth/auth.types';
import MyButton from '../../theme/components/Button/Button';
import { MyInputField } from '../../theme/components/InputField/InputField';
import { typography } from '../../theme/foundations';
import { loginSchema } from '../../validations/auth.validation';

const Login = () => {
    const {
        control,
        // handleSubmit,
        formState: { errors },
    } = useForm<LoginCredential>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // const onSubmit = (data: LoginCredential) => {
    //     console.log(data);
    // };

    return (
        <CenteredContainer maxWidth="tablet" disableGutters>
            <Box
                component="form"
                // onSubmit={handleSubmit(onSubmit)}
                width="100%"
                maxWidth={typography.typographyUtil.pxToRem(500)}
                paddingInline={7}
            >
                <Stack spacing={10}>
                    <Stack spacing={1.2}>
                        <Typography variant="h4" textAlign="center">
                            WELCOME BACK
                        </Typography>

                        <Typography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Your next delicious meal is just a login away
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
                        <MyButton type="submit" variant="contained" fullWidth>
                            Login
                        </MyButton>

                        <Typography variant="body2" textAlign="center">
                            Don&apos;t have an account ?
                            <ClickableLink
                                component="a"
                                href="#"
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
