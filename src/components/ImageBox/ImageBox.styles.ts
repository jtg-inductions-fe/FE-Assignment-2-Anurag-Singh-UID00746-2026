import { styled } from '@mui/material/styles';

import { ImageProps } from './ImageBox.types';

export const Image = styled('img')<ImageProps>(() => ({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
}));
