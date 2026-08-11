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
import { FOOD_CATEGORY } from '@constant';
import Badge from '@components/Badge/Badge';
import { Image } from '@components/ImageBox/ImageBox.styles';

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
                            aria-label={`Edit ${restaurant.name}`}
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
                            aria-label={`Delete ${restaurant.name}`}
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
                            {restaurant.name}
                        </MuiTypography>
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

                    <MuiTypography
                        variant="subtitle2"
                        color="primary"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                    >
                        {restaurant.description}
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
                        {restaurant.address}
                    </MuiTypography>
                </MetaContainer>
            </StyledCardContent>
        </StyledCard>
    );
};
