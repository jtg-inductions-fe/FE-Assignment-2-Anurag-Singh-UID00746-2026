import { ChangeEvent } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { alpha, Box, Stack, Typography } from '@mui/material';
import { TOAST_TYPES } from '@components/constants';
import { SignupCredential } from '@features/auth/auth.types';
import { signup } from '@features/auth/authThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch } from '@store/hooks';
import { typography } from '@theme/foundations';
import { theme } from '@theme/index';
import { signupSchema } from '@validations/auth.validation';

import { ROLECARD } from './rolecard';
import { ClickableLink, Wrapper } from './signup.styles';
import { USER_ROLE } from '../../types/user.types';
import { FeatureCard } from '@components/FeatureCard';
import { InputField } from '@components/InputField';
import { Button } from '@components/Button';

const Signup = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupCredential>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: USER_ROLE.CUSTOMER,
        },
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: SignupCredential) => {
        try {
            await dispatch(signup(data)).unwrap();
            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Success',
                    message: 'Account created successfully !!',
                }),
            );
            await navigate(ROUTES.AUTH.LOGIN);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Signup Failed',
                    message: error as string,
                }),
            );
        }
    };

    return (
        <Wrapper>
            <Box
                component="form"
                onSubmit={(event: ChangeEvent<HTMLInputElement>) =>
                    void handleSubmit(onSubmit)(event)
                }
                width="100%"
                maxWidth={typography.typographyUtil.pxToRem(500)}
                paddingInline={4}
                mt={10}
            >
                <Stack spacing={10}>
                    <Stack spacing={1.5}>
                        <Typography variant="h3" textAlign="center">
                            CREATE AN ACCOUNT
                        </Typography>

                        <Typography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Join us today and be a part of a delicious journey
                            that brings people and food together
                        </Typography>
                    </Stack>

                    <Stack spacing={2.5}>
                        <Typography
                            variant="subtitle1"
                            color="common.black"
                            pl={2}
                        >
                            Want to join as
                        </Typography>

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <Box
                                    width="100%"
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    gap={3}
                                >
                                    {ROLECARD.map((item) => (
                                        <FeatureCard
                                            key={item.value}
                                            image={item.image}
                                            title={item.title}
                                            selected={
                                                field.value === item.value
                                            }
                                            onClick={() =>
                                                field.onChange(item.value)
                                            }
                                        />
                                    ))}
                                </Box>
                            )}
                        />
                    </Stack>

                    <Stack spacing={6}>
                        <Stack spacing={2}>
                            <Typography variant="body1">Full Name</Typography>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your full name"
                                        fullWidth
                                        error={!!errors.fullName}
                                        helperText={errors.fullName?.message}
                                    />
                                )}
                            />
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="body1">Email</Typography>
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
                        </Stack>

                        <Stack spacing={2}>
                            <Typography variant="body1">Password</Typography>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
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

                        <Stack spacing={2}>
                            <Typography variant="body1">
                                Confirm Password
                            </Typography>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        type="password"
                                        placeholder="Confirm your password"
                                        fullWidth
                                        error={!!errors.confirmPassword}
                                        helperText={
                                            errors.confirmPassword?.message
                                        }
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>

                    <Stack spacing={6}>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                        >
                            {!isSubmitting && 'Create Account'}
                        </Button>

                        <Typography variant="body2" textAlign="center">
                            Already have an account ?
                            <ClickableLink
                                component={Link}
                                to="/login"
                                color="primary"
                                fontWeight="inherit"
                            >
                                Sign In
                            </ClickableLink>
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Wrapper>
    );
};

export default Signup;
