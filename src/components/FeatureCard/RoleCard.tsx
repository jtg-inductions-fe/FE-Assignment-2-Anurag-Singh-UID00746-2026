import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography } from '@mui/material';

import {
    Illustration,
    ImgBox,
    MyBadge,
    MyCardActionArea,
    StyledCard,
} from './RoleCard.styles';
import { RoleCardProps } from './Rolecard.types';

const RoleCard = ({
    image,
    title,
    selected = false,
    onClick,
}: RoleCardProps) => (
    <StyledCard selected={selected}>
        <MyCardActionArea onClick={onClick}>
            <MyBadge selected={selected}>
                {selected && <CheckRoundedIcon />}
            </MyBadge>
            <ImgBox height={130}>
                <Illustration className="role-image" src={image} alt={title} />
            </ImgBox>

            <Typography mt={3} variant="h6">
                {title.toUpperCase()}
            </Typography>
        </MyCardActionArea>
    </StyledCard>
);

export default RoleCard;
