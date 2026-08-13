import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';

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
import { Image } from '@components/ImageBox';
import { Button } from '@components/Button';
import { USER_ROLE } from '@components/constants';
import { Chip } from '@components/Chip';

const MenuItemCard = (props: MenuItemCardProps) => (
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
                {props.role === USER_ROLE.OWNER &&
                props.menuItem.stock === 0 ? (
                    <Chip label="OUT OF STOCK" size="small" color="warning" />
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
                    {props.role === USER_ROLE.OWNER ? (
                        <OwnerActions>
                            <ActionIcon onClick={props.onEdit}>
                                <EditOutlinedIcon color="primary" />
                            </ActionIcon>

                            <ActionIcon onClick={props.onDelete}>
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
                        props.isOpen &&
                        props.role === USER_ROLE.CUSTOMER && (
                            <Button
                                variant="contained"
                                onClick={props.onAddToCart}
                            >
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
