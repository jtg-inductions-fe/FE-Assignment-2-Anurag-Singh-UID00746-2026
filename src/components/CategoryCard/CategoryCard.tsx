import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography } from '@mui/material';
import {
    ContentWrapper,
    LogoWrapper,
    MyBadge,
    MyCardActionArea,
    StyledCard,
} from './CategoryCard.styles';
import { CategoryCardProps } from './Category.types';
import { MyImage } from '@components/ImageBox/ImageBox.styles';

const CategoryCard = ({
    image,
    title,
    subtitle,
    selected = false,
    onClick,
}: CategoryCardProps) => (
    <StyledCard selected={selected}>
        <MyCardActionArea onClick={onClick}>
            <MyBadge selected={selected}>
                {selected && <CheckRoundedIcon />}
            </MyBadge>

            <LogoWrapper>
                <MyImage src={image} />
            </LogoWrapper>

            <ContentWrapper>
                <Typography mt={3} variant="h6">
                    {title.toUpperCase()}
                </Typography>
                <Typography mt={3} variant="subtitle2">
                    {subtitle}
                </Typography>
            </ContentWrapper>
        </MyCardActionArea>
    </StyledCard>
);

export default CategoryCard;
