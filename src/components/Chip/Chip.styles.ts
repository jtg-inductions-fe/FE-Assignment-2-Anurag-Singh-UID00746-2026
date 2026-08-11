import { Chip, styled } from '@mui/material';
import { typography } from '@theme/foundations';

export const StyledChip = styled(Chip)(() => ({
    borderRadius: typography.typographyUtil.pxToRem(10),
    opacity: 0.8,
    textTransform: 'uppercase',
}));
