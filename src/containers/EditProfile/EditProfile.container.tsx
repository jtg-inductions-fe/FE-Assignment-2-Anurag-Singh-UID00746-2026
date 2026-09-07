import { TOAST_TYPES } from '@components/constants';
import { SignupForm, Wrapper } from '@containers/Signup/Signup.styles';
import { showToast } from '@features/toast/toastSlice';
import { ROUTES } from '@router/routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useNavigate } from 'react-router-dom';
import { Stack as MuiStack, Typography as MuiTypography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUser } from '@features/auth/authThunk';
import { UserProfileData, userSchema } from '@validations/auth.validation';
import { useEffect } from 'react';
import { InputField } from '@components/InputField';
import { Button } from '@components/Button/Button.component';
import { StorefrontOutlined } from '@mui/icons-material';

export const EditProfile = () => {
    const form = useForm<UserProfileData>({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: '',
        },
    });

    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
            });
        }
    }, [user, form]);

    const handleUpdateProfile = async (data: UserProfileData) => {
        try {
            await dispatch(updateUser(data)).unwrap();
            dispatch(
                showToast({
                    type: TOAST_TYPES.SUCCESS,
                    title: 'Profile Updated',
                    message: 'Your profile has been updated successfully.',
                }),
            );
            navigate(ROUTES.ROOT);
        } catch (error) {
            dispatch(
                showToast({
                    type: TOAST_TYPES.ERROR,
                    title: 'Profile Update Failed',
                    message: error as string,
                }),
            );
        }
    };

    return (
        <Wrapper>
            <SignupForm onSubmit={form.handleSubmit(handleUpdateProfile)}>
                <MuiStack spacing={10}>
                    <MuiStack spacing={1.5}>
                        <MuiTypography variant="h3" textAlign="center">
                            EDIT PROFILE
                        </MuiTypography>

                        <MuiTypography variant="body1" textAlign="center">
                            Update your profile information below.
                        </MuiTypography>
                    </MuiStack>

                    <MuiStack spacing={2}>
                        <MuiTypography variant="body1">Full Name</MuiTypography>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <InputField
                                    {...field}
                                    placeholder="Enter your Name"
                                    fullWidth
                                    error={!!form.formState.errors.name}
                                    helperText={
                                        form.formState.errors.name?.message
                                    }
                                />
                            )}
                        />
                    </MuiStack>
                </MuiStack>

                <Button
                    sx={{ mt: 8 }}
                    type="submit"
                    variant="contained"
                    startIcon={<StorefrontOutlined />}
                    loading={form.formState.isSubmitting}
                >
                    {!form.formState.isSubmitting && 'Save changes'}
                </Button>
            </SignupForm>
        </Wrapper>
    );
};
