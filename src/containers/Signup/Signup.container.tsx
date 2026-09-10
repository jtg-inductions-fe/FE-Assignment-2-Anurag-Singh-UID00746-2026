import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
    alpha,
    Box as MuiBox,
    Stack as MuiStack,
    Typography as MuiTypography,
} from '@mui/material';
import { TOAST_TYPES, USER_ROLE } from '@components/constants';
import { SignupCredential } from '@features/auth/auth.types';
import { signup } from '@features/auth/authThunk';
import { showToast } from '@features/toast/toastSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { ROUTES } from '@router/routes';
import { useAppDispatch } from '@store/hooks';
import { theme } from '@theme/index';
import { signupSchema } from '@validations/auth.validation';

import { ROLECARD } from './rolecard';
import { InputField } from '@components/InputField';
import { Button } from '@components/Button';
import { FeatureCard } from '@components/FeatureCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    IconButton as MuiIconButton,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';
import { useState } from 'react';
import { Link } from '@components/Link';
import { SignupForm, Wrapper } from './Signup.styles';

export const Signup = () => {
    const form = useForm<SignupCredential>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: USER_ROLE.CUSTOMER,
            address: {
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
            },
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    /**
     * Creates a new user by calling the action and navigates the user to login route
     */
    const onSubmit = async (data: SignupCredential) => {
        setIsSigningUp(true);

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
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <Wrapper>
            <SignupForm onSubmit={handleSubmit(onSubmit)}>
                <MuiStack spacing={10}>
                    <MuiStack spacing={1.5}>
                        <MuiTypography variant="h3" textAlign="center">
                            CREATE AN ACCOUNT
                        </MuiTypography>

                        <MuiTypography
                            variant="body1"
                            color={alpha(theme.palette.text.secondary, 0.7)}
                            textAlign="center"
                        >
                            Join us today and be a part of a delicious journey
                            that brings people and food together
                        </MuiTypography>
                    </MuiStack>

                    <MuiStack spacing={2.5}>
                        <MuiTypography
                            variant="subtitle1"
                            color="common.black"
                            pl={2}
                        >
                            Want to join as
                        </MuiTypography>

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <MuiBox
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
                                </MuiBox>
                            )}
                        />
                    </MuiStack>

                    <MuiStack spacing={6}>
                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Full Name
                            </MuiTypography>
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your full name"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.fullName}
                                        helperText={errors.fullName?.message}
                                    />
                                )}
                            />
                        </MuiStack>

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
                                        disabled={isSigningUp}
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
                                        disabled={isSigningUp}
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
                                                            disabled={
                                                                isSigningUp
                                                            }
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

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Confirm Password
                            </MuiTypography>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Confirm your password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        disabled={isSigningUp}
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
                                                            disabled={
                                                                isSigningUp
                                                            }
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
                                        error={!!errors.confirmPassword}
                                        helperText={
                                            errors.confirmPassword?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Address Line 1
                            </MuiTypography>
                            <Controller
                                name="address.address_line_1"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter address line 1"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.address_line_1}
                                        helperText={
                                            errors.address?.address_line_1
                                                ?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Address Line 2
                            </MuiTypography>
                            <Controller
                                name="address.address_line_2"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter address line 2"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.address_line_2}
                                        helperText={
                                            errors.address?.address_line_2
                                                ?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">City</MuiTypography>
                            <Controller
                                name="address.city"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your city"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.city}
                                        helperText={
                                            errors.address?.city?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">State</MuiTypography>
                            <Controller
                                name="address.state"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your state"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.state}
                                        helperText={
                                            errors.address?.state?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Postal Code
                            </MuiTypography>
                            <Controller
                                name="address.postal_code"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your postal code"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.postal_code}
                                        helperText={
                                            errors.address?.postal_code?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>

                        <MuiStack spacing={2}>
                            <MuiTypography variant="body1">
                                Country
                            </MuiTypography>
                            <Controller
                                name="address.country"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        placeholder="Enter your country"
                                        fullWidth
                                        disabled={isSigningUp}
                                        error={!!errors.address?.country}
                                        helperText={
                                            errors.address?.country?.message
                                        }
                                    />
                                )}
                            />
                        </MuiStack>
                    </MuiStack>

                    <MuiStack spacing={6}>
                        <Button
                            type="submit"
                            loading={isSubmitting || isSigningUp}
                            disabled={isSigningUp}
                            variant="contained"
                            fullWidth
                        >
                            {!isSubmitting && !isSigningUp && 'Create Account'}
                        </Button>

                        <MuiTypography variant="body2" textAlign="center">
                            Already have an account ?
                            <Link href={ROUTES.AUTH.LOGIN} color="primary">
                                Sign In
                            </Link>
                        </MuiTypography>
                    </MuiStack>
                </MuiStack>
            </SignupForm>
        </Wrapper>
    );
};
