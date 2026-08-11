import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography } from '@mui/material';

import { CategoryCardProps } from './Category.types';
import {
    ContentWrapper,
    LogoWrapper,
    MyBadge,
    MyCardActionArea,
    StyledCard,
} from './CategoryCard.styles';
import { Image } from '@components/ImageBox';

export const CategoryCard = ({
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
                <Image src={image} />
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
