import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';

import Badge from '@components/Badge/Badge';
import MyButton from '@components/Button/Button';
import { MyImage } from '@components/ImageBox/ImageBox.styles';
import QuantitySelector from '@components/QuantitySelector/QuantitySelector';

import {
    ActionIcon,
    ActionWrapper,
    Content,
    Description,
    Footer,
    MetaContainer,
    Name,
    OwnerActions,
    StyledCard,
} from './MenuItemCard.styles';
import { MenuItemCardProps } from './MenuItemCard.types';
import { USER_ROLE } from '../../types/user.types';

const MenuItemCard = ({
    menuItem,
    role,
    quantity = 0,
    onIncrement,
    onDecrement,
    onEdit,
    onDelete,
    onAddToCart,
}: MenuItemCardProps) => (
    <StyledCard elevation={0}>
        <MyImage
            src={menuItem.image}
            alt={menuItem.name}
            sx={{
                height: { mobile: 250, tablet: 180 },
                width: { mobile: '100%', tablet: 150 },
            }}
        />
        <Content>
            <MetaContainer>
                {role === USER_ROLE.OWNER && menuItem.stock === 0 ? (
                    <Badge label="OUT OF STOCK" size="small" color="warning" />
                ) : (
                    <Badge
                        label={menuItem.isVeg ? 'VEG' : 'NON VEG'}
                        color={menuItem.isVeg ? 'success' : 'error'}
                        size="small"
                    />
                )}

                <Description>
                    <Name variant="h6">{menuItem.name}</Name>
                    <Typography variant="body1" color="text.secondary">
                        {menuItem.description}
                    </Typography>
                </Description>
            </MetaContainer>

            <Footer>
                <Box width="100%">
                    <Typography variant="h6">₹{menuItem.price}</Typography>
                </Box>
                <ActionWrapper>
                    {role === USER_ROLE.OWNER ? (
                        <OwnerActions>
                            <ActionIcon onClick={onEdit}>
                                <EditOutlinedIcon color="primary" />
                            </ActionIcon>

                            <ActionIcon onClick={onDelete}>
                                <DeleteOutlineOutlinedIcon color="error" />
                            </ActionIcon>
                        </OwnerActions>
                    ) : menuItem.stock === 0 ? (
                        <Badge
                            label="NOT AVAILABLE"
                            size="small"
                            color="warning"
                        />
                    ) : (
                        role === USER_ROLE.CUSTOMER && (
                            <QuantitySelector
                                quantity={quantity}
                                onIncrement={onIncrement!}
                                onDecrement={onDecrement!}
                            />
                        )
                    )}

                    {role === USER_ROLE.CUSTOMER && quantity > 0 && (
                        <MyButton variant="contained" onClick={onAddToCart}>
                            Add Item
                        </MyButton>
                    )}
                </ActionWrapper>
            </Footer>
        </Content>
    </StyledCard>
);

export default MenuItemCard;
