import { ChipProps } from '@mui/material';
import { StyledChip } from './Badge.styles';

const Badge = ({ label, color, size }: ChipProps) => {
    return <StyledChip label={label} color={color} size={size} />;
};

export default Badge;
