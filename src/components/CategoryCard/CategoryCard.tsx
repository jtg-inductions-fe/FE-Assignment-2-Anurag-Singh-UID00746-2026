import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography as MuiTypography } from '@mui/material';
import {
    ContentWrapper,
    LogoWrapper,
    MyBadge,
    MyCardActionArea,
    StyledCard,
} from './CategoryCard.styles';
import { CategoryCardProps } from './Category.types';
import { Image } from '@components/ImageBox/ImageBox.styles';

const CategoryCard = ({
    image,
    title,
    subtitle,
    selected = false,
    onClick,
}: CategoryCardProps) => (
    <StyledCard selected={selected} aria-pressed={selected}>
        <MyCardActionArea onClick={onClick}>
            <MyBadge selected={selected}>
                {selected && <CheckRoundedIcon />}
            </MyBadge>

            <LogoWrapper>
                <Image src={image} />
            </LogoWrapper>

            <ContentWrapper>
                <MuiTypography mt={3} variant="h6">
                    {title.toUpperCase()}
                </MuiTypography>
                <MuiTypography mt={3} variant="subtitle2">
                    {subtitle}
                </MuiTypography>
            </ContentWrapper>
        </MyCardActionArea>
    </StyledCard>
);

export default CategoryCard;
