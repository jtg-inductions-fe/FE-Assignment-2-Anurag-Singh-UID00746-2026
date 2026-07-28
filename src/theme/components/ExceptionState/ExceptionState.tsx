import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Divider, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { ExceptionStateProps } from './ExceptionState.types';
import EmptyStateImage from '../../../assets/images/empty-state.webp';
import ErrorStateImage from '../../../assets/images/error-state.webp';
import { EXCEPTION_STATE_TYPES } from '../constants';

const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    padding: theme.spacing(6, 3),
}));

const StyledImage = styled('img')(({ theme }) => ({
    width: '100%',
    maxWidth: theme.spacing(60),
    objectFit: 'contain',
    userSelect: 'none',
    pointerEvents: 'none',
    marginBottom: theme.spacing(4),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightRegular,
    marginBottom: theme.spacing(2),
    letterSpacing: theme.spacing(0.3),
    background: 'linear-gradient(180deg, #2b2d42 0%, #4a4e69 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
    maxWidth: theme.spacing(90),
    color: alpha(theme.palette.text.secondary, 0.5),
    marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(3),
}));

const StyledDivider = styled(Divider, {
    shouldForwardProp: (prop) => prop !== 'type',
})<{ type: string }>(({ theme, type }) => ({
    height: theme.spacing(5),
    alignSelf: 'center',
    borderColor:
        type === EXCEPTION_STATE_TYPES.ERROR
            ? theme.palette.error.main
            : theme.palette.primary.main,
}));

const EmptyState = ({
    type = EXCEPTION_STATE_TYPES.ERROR,
    title,
    description,
    onRetry,
    ...boxProps
}: ExceptionStateProps) => {
    const navigate = useNavigate();

    const handleFixedRetry = () => {
        onRetry?.();
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

export default EmptyState;
