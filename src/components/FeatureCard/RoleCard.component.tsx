import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { Typography as MuiTypography } from '@mui/material';

import {
    ImgBox,
    CheckBox,
    MyCardActionArea,
    StyledCard,
} from './RoleCard.styles';
import { RoleCardProps } from './Rolecard.types';
import { Image } from '@components/ImageBox/ImageBox.styles';

export const FeatureCard = (props: RoleCardProps) => (
    <StyledCard selected={props.selected ?? false}>
        <MyCardActionArea onClick={props.onClick} aria-pressed={props.selected}>
            <CheckBox selected={props.selected}>
                {props.selected && <CheckRoundedIcon />}
            </CheckBox>
            <ImgBox height={130}>
                <Image
                    className="role-image"
                    src={props.image}
                    alt={props.title}
                />
            </ImgBox>

            <MuiTypography mt={3} variant="h6">
                {props.title.toUpperCase()}
            </MuiTypography>
        </MyCardActionArea>
    </StyledCard>
);
