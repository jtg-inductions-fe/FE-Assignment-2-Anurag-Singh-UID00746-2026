import { ChipProps } from '@mui/material';

import { StyledChip } from './Badge.styles';

export const Badge = ({ label, color, size }: ChipProps) => (
    <StyledChip label={label} color={color} size={size} />
);
