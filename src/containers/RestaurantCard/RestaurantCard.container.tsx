import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { alpha, Typography } from '@mui/material';

import { FOOD_CATEGORY } from '@constant';
import { theme } from '@theme/index';

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
import { Image } from '@components/ImageBox';
import { Badge } from '@components/Badge';

export const RestaurantCard = ({
    restaurant,
    isOpen,
    onCardClick,
    onEdit,
    onDelete,
    canEdit,
    canDelete,
}: RestaurantCardProps) => {
    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onCardClick(restaurant);
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
            aria-label={`Open restaurant ${restaurant.name}`}
            onClick={() => onCardClick(restaurant)}
            onKeyDown={handleCardKeyDown}
            elevation={0}
        >
            {(canEdit || canDelete) && (
                <ActionContainer>
                    {canEdit && (
                        <StyledIconButton
                            onClick={(event) => {
                                event.stopPropagation();
                                onEdit(restaurant);
                            }}
                            onKeyDown={handleIconButtonKeyDown}
                        >
                            <EditOutlinedIcon />
                        </StyledIconButton>
                    )}

                    {canDelete && (
                        <StyledIconButton
                            color="error"
                            onClick={(event) => {
                                event.stopPropagation();
                                onDelete(restaurant);
                            }}
                            onKeyDown={handleIconButtonKeyDown}
                        >
                            <DeleteOutlineOutlinedIcon />
                        </StyledIconButton>
                    )}
                </ActionContainer>
            )}

            {!isOpen && <ClosedBadge label="closed" size="medium" />}

            <ImageContainer>
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    height={250}
                    width="100%"
                />
                {!isOpen && (
                    <Overlay>
                        <OverlayContent>
                            <IconWrapper>
                                <HttpsOutlinedIcon
                                    fontSize="large"
                                    color="primary"
                                />
                            </IconWrapper>
                            <Typography
                                variant="subtitle1"
                                color={alpha(theme.palette.common.white, 0.9)}
                            >
                                CLOSED FOR TODAY
                            </Typography>
                        </OverlayContent>
                    </Overlay>
                )}
            </ImageContainer>

            <StyledCardContent>
                <InfoContainer maxWidth={{ tablet: 500 }}>
                    <HeaderBox>
                        <Typography
                            variant="h5"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                            overflow="hidden"
                        >
                            {restaurant.name}
                        </Typography>
                        {restaurant.category === FOOD_CATEGORY.VEG && (
                            <Badge label="Veg" size="medium" color="success" />
                        )}

                        {restaurant.category === FOOD_CATEGORY.NON_VEG && (
                            <Badge
                                label="Non Veg"
                                size="medium"
                                color="error"
                            />
                        )}
                    </HeaderBox>

                    <Typography
                        variant="subtitle2"
                        color="primary"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {restaurant.description}
                    </Typography>
                </InfoContainer>

                <MetaContainer>
                    <Typography
                        maxWidth={400}
                        variant="caption"
                        color="common.black"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {restaurant.address}
                    </Typography>
                </MetaContainer>
            </StyledCardContent>
        </StyledCard>
    );
};
