import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography as MuiTypography } from '@mui/material';

import EmptyStateImage from '/images/empty-state.webp';
import ErrorStateImage from '/images/error-state.webp';

import {
    StyledButton,
    StyledContainer,
    StyledDescription,
    StyledDivider,
    StyledImage,
    StyledTitle,
} from './ExceptionState.styles';
import { ExceptionStateProps } from './ExceptionState.types';
import { EXCEPTION_STATE_TYPES } from '@components/constants';

export const ExceptionState = (boxProps: ExceptionStateProps) => {
    const { type = EXCEPTION_STATE_TYPES.ERROR } = boxProps;
    const navigate = useNavigate();

    const handleFixedRetry = () => {
        boxProps.onRetry ? boxProps.onRetry() : window.location.reload();
    };

    const handleBack = async () => {
        await navigate(-1);
    };

    return (
        <StyledContainer {...boxProps}>
            <StyledImage
                alt="Empty state image"
                src={
                    type === EXCEPTION_STATE_TYPES.ERROR
                        ? ErrorStateImage
                        : EmptyStateImage
                }
            />
            <StyledTitle variant="h4">{boxProps.title}</StyledTitle>
            {boxProps.description && (
                <StyledDescription variant="subtitle1">
                    {boxProps.description}
                </StyledDescription>
            )}
            <StyledButton
                variant="outlined"
                color={
                    type === EXCEPTION_STATE_TYPES.ERROR ? 'error' : 'primary'
                }
                onClick={
                    type === EXCEPTION_STATE_TYPES.ERROR
                        ? handleFixedRetry
                        : handleBack
                }
                disableRipple
            >
                {type === EXCEPTION_STATE_TYPES.ERROR ? (
                    <RefreshIcon fontSize="medium" />
                ) : (
                    <ArrowBack fontSize="medium" />
                )}

                {type === EXCEPTION_STATE_TYPES.ERROR && (
                    <StyledDivider orientation="vertical" type={type} />
                )}

                <MuiTypography variant="body1">
                    {type === EXCEPTION_STATE_TYPES.ERROR ? 'Retry' : 'Back'}
                </MuiTypography>
            </StyledButton>
        </StyledContainer>
    );
};
