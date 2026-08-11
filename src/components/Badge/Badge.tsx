import { ChipProps } from '@mui/material';
import { StyledChip } from './Badge.styles';

const Badge = ({ label, color, size, ...props }: ChipProps) => {
    return <StyledChip {...props} label={label} color={color} size={size} />;
};

export default Badge;
