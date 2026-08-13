import { styled, Box } from '@mui/material';
import { typography } from '@theme/foundations';

export const Container = styled(Box)(() => ({
    marginTop: typography.typographyUtil.pxToRem(100),
}));
