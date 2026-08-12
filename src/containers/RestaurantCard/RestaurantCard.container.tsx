import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { alpha, Typography as MuiTypography } from '@mui/material';

import {
    ActionContainer,
    ClosedBadge,
    HeaderBox,
    IconWrapper,
    ImageContainer,
    InfoContainer,
    MetaContainer,
    Overlay,
    OverlayContent,
    StyledCard,
    StyledCardContent,
    StyledIconButton,
} from './RestaurantCard.styles';
import { RestaurantCardProps } from './restaurantCard.types';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { theme } from '@theme/index';
import { FOOD_CATEGORY } from '@constant/index';
import { Image } from '@components/ImageBox/ImageBox.styles';
import { Chip } from '@components/Chip';

export const RestaurantCard = (props: RestaurantCardProps) => {
    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            props.onCardClick(props.restaurant);
        }
    };

    const handleIconButtonKeyDown = (
        event: React.KeyboardEvent<HTMLElement>,
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.stopPropagation();
        }
    };

    return (
        <StyledCard
            tabIndex={0}
            role="button"
            aria-label={`Open restaurant ${props.restaurant.name}`}
            onClick={() => props.onCardClick(props.restaurant)}
            onKeyDown={handleCardKeyDown}
            elevation={0}
        >
            {(props.canEdit || props.canDelete) && (
                <ActionContainer>
                    {props.canEdit && (
                        <StyledIconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onEdit(props.restaurant);
                            }}
                            onKeyDown={handleIconButtonKeyDown}
                            aria-label={`Edit ${props.restaurant.name}`}
                        >
                            <EditOutlinedIcon />
                        </StyledIconButton>
                    )}

                    {props.canDelete && (
                        <StyledIconButton
                            color="error"
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onDelete(props.restaurant);
                            }}
                            onKeyDown={handleIconButtonKeyDown}
                            aria-label={`Delete ${props.restaurant.name}`}
                        >
                            <DeleteOutlineOutlinedIcon />
                        </StyledIconButton>
                    )}
                </ActionContainer>
            )}

            {!props.isOpen && <ClosedBadge label="closed" size="medium" />}

            <ImageContainer>
                <Image
                    src={props.restaurant.image}
                    alt={props.restaurant.name}
                    height={250}
                    width="100%"
                />
                {!props.isOpen && (
                    <Overlay>
                        <OverlayContent>
                            <IconWrapper>
                                <HttpsOutlinedIcon
                                    fontSize="large"
                                    color="primary"
                                />
                            </IconWrapper>
                            <MuiTypography
                                variant="subtitle1"
                                color={alpha(theme.palette.common.white, 0.9)}
                            >
                                CLOSED FOR TODAY
                            </MuiTypography>
                        </OverlayContent>
                    </Overlay>
                )}
            </ImageContainer>

            <StyledCardContent>
                <InfoContainer maxWidth={{ sm: 500 }}>
                    <HeaderBox>
                        <MuiTypography
                            variant="h5"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            overflow="hidden"
                        >
                            {props.restaurant.name}
                        </MuiTypography>
                        {props.restaurant.category === FOOD_CATEGORY.VEG && (
                            <Chip label="Veg" size="medium" color="success" />
                        )}

                        {props.restaurant.category ===
                            FOOD_CATEGORY.NON_VEG && (
                            <Chip label="Non Veg" size="medium" color="error" />
                        )}
                    </HeaderBox>

                    <MuiTypography
                        variant="subtitle2"
                        color="primary"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {props.restaurant.description}
                    </MuiTypography>
                </InfoContainer>

                <MetaContainer>
                    <MuiTypography
                        maxWidth={400}
                        variant="caption"
                        color="common.black"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {props.restaurant.address}
                    </MuiTypography>
                </MetaContainer>
            </StyledCardContent>
        </StyledCard>
    );
};
