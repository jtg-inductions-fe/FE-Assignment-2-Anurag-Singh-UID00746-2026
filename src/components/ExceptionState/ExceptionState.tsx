import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography } from '@mui/material';

import EmptyStateImage from '@assets/images/empty-state.webp';
import ErrorStateImage from '@assets/images/error-state.webp';

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

const ExceptionState = ({
    type = EXCEPTION_STATE_TYPES.ERROR,
    title,
    description,
    ...boxProps
}: ExceptionStateProps) => {
    const navigate = useNavigate();

    const handleFixedRetry = () => {
        window.location.reload();
    };

    const handleBack = async () => {
        await navigate(-1);
    };

    return (
        <StyledContainer {...boxProps}>
            <StyledImage
                alt="Empty state"
                src={
                    type === EXCEPTION_STATE_TYPES.ERROR
                        ? ErrorStateImage
                        : EmptyStateImage
                }
            />
            <StyledTitle variant="h4">{title}</StyledTitle>
            {description && (
                <StyledDescription variant="subtitle1">
                    {description}
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

                <Typography variant="body1">
                    {type === EXCEPTION_STATE_TYPES.ERROR ? 'Retry' : 'Back'}
                </Typography>
            </StyledButton>
        </StyledContainer>
    );
};

export default ExceptionState;
