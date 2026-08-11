import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography as MuiTypography } from '@mui/material';

import {
    Illustration,
    ImgBox,
    MyBadge,
    MyCardActionArea,
    StyledCard,
} from './RoleCard.styles';
import { RoleCardProps } from './Rolecard.types';

const FeatureCard = ({
    image,
    title,
    selected = false,
    onClick,
}: RoleCardProps) => (
    <StyledCard selected={selected}>
        <MyCardActionArea onClick={onClick} aria-pressed={selected}>
            <MyBadge selected={selected}>
                {selected && <CheckRoundedIcon />}
            </MyBadge>
            <ImgBox height={130}>
                <Illustration className="role-image" src={image} alt={title} />
            </ImgBox>

            <MuiTypography mt={3} variant="h6">
                {title.toUpperCase()}
            </MuiTypography>
        </MyCardActionArea>
    </StyledCard>
);

export default FeatureCard;
