import { ChangeEvent } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

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
import { typography } from '@theme/foundations';
import { theme } from '@theme/index';
import { signupSchema } from '@validations/auth.validation';

import { ROLECARD } from './rolecard';
import { InputField } from '@components/InputField';
import { Button } from '@components/Button';
import { ClickableLink, Wrapper } from './Signup.styles';
import { FeatureCard } from '@components/FeatureCard';

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

    /**
     * Creates a new user by calling the action and navigates the user to login route
     */
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
            <MuiBox
                component="form"
                onSubmit={(event: ChangeEvent<HTMLInputElement>) =>
                    void handleSubmit(onSubmit)(event)
                }
                width="100%"
                maxWidth={typography.typographyUtil.pxToRem(500)}
                paddingInline={4}
                mt={10}
            >
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
                                        type="password"
                                        placeholder="Enter your password"
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
                        </MuiStack>
                    </MuiStack>

                    <MuiStack spacing={6}>
                        <Button
                            type="submit"
                            loading={isSubmitting}
                            variant="contained"
                            fullWidth
                        >
                            {!isSubmitting && 'Create Account'}
                        </Button>

                        <MuiTypography variant="body2" textAlign="center">
                            Already have an account ?
                            <ClickableLink
                                component={Link}
                                to="/login"
                                color="primary"
                                fontWeight="inherit"
                            >
                                Sign In
                            </ClickableLink>
                        </MuiTypography>
                    </MuiStack>
                </MuiStack>
            </MuiBox>
        </Wrapper>
    );
};

export default Signup;
