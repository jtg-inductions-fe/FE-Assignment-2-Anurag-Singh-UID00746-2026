import { ReactNode } from 'react';

/** Type of List props */
export interface ListProps<T> {
    /** Array of items to be rendered */
    items: T[];

    /** Function to render a single item */
    renderItem: (item: T) => ReactNode;
}
