import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Typography } from '@mui/material';

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
import { Image } from '@components/ImageBox';
import { Badge } from '@components/Badge';
import { Button } from '@components/Button';

const MenuItemCard = ({
    menuItem,
    role,
    onEdit,
    onDelete,
    onAddToCart,
}: MenuItemCardProps) => (
    <StyledCard elevation={0}>
        <Image
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
                            <Button variant="contained" onClick={onAddToCart}>
                                Add Item
                            </Button>
                        )
                    )}
                </ActionWrapper>
            </Footer>
        </Content>
    </StyledCard>
);

export default MenuItemCard;
