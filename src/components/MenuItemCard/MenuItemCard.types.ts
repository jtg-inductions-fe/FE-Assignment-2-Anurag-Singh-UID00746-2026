import { MenuItem } from '../../types/menuItem.types';

export type MenuItemCardProps = {
    menuItem: MenuItem;
    isOwner: boolean;
    quantity?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onAddToCart?: () => void;
};
