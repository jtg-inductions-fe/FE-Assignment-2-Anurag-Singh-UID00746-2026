import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';

import QuantitySelector from '@components/QuantitySelector/QuantitySelector';

import {
    ActionIcon,
    Content,
    Description,
    Footer,
    Name,
    OwnerActions,
    StyledCard,
    MetaContainer,
    ActionWrapper,
} from './MenuItemCard.styles';

import { MenuItemCardProps } from './MenuItemCard.types';
import { Image } from '@components/ImageBox/ImageBox.styles';
import Chip from '@components/Chip/Chip.component';
import { Button } from '@components/Button/Button.component';

const MenuItemCard = ({ quantity = 0, ...props }: MenuItemCardProps) => {
    return (
        <StyledCard elevation={0}>
            <Image
                src={props.menuItem.image}
                alt={props.menuItem.name}
                sx={{
                    height: { xs: 250, sm: 180 },
                    width: { xs: '100%', sm: 150 },
                }}
            />
            <Content>
                <MetaContainer>
                    {props.isOwner && props.menuItem.stock === 0 ? (
                        <Chip
                            label="OUT OF STOCK"
                            size="small"
                            color="warning"
                        />
                    ) : (
                        <Chip
                            label={props.menuItem.isVeg ? 'VEG' : 'NON VEG'}
                            color={props.menuItem.isVeg ? 'success' : 'error'}
                            size="small"
                        />
                    )}

                    <Description>
                        <Name variant="h6">{props.menuItem.name}</Name>
                        <MuiTypography variant="body1" color="text.secondary">
                            {props.menuItem.description}
                        </MuiTypography>
                    </Description>
                </MetaContainer>

                <Footer>
                    <MuiBox width="100%">
                        <MuiTypography variant="h6">
                            ₹{props.menuItem.price}
                        </MuiTypography>
                    </MuiBox>
                    <ActionWrapper>
                        {props.isOwner ? (
                            <OwnerActions>
                                <ActionIcon
                                    onClick={props.onEdit}
                                    aria-label="Edit menu item"
                                >
                                    <EditOutlinedIcon color="primary" />
                                </ActionIcon>

                                <ActionIcon
                                    onClick={props.onDelete}
                                    aria-label="Delete menu item"
                                >
                                    <DeleteOutlineOutlinedIcon color="error" />
                                </ActionIcon>
                            </OwnerActions>
                        ) : props.menuItem.stock === 0 ? (
                            <Chip
                                label="NOT AVAILABLE"
                                size="small"
                                color="warning"
                            />
                        ) : (
                            <QuantitySelector
                                quantity={quantity}
                                onIncrement={props.onIncrement!}
                                onDecrement={props.onDecrement!}
                            />
                        )}
                        {!props.isOwner && quantity > 0 && (
                            <Button
                                variant="contained"
                                onClick={props.onAddToCart}
                            >
                                Add Item
                            </Button>
                        )}
                    </ActionWrapper>
                </Footer>
            </Content>
        </StyledCard>
    );
};

export default MenuItemCard;
