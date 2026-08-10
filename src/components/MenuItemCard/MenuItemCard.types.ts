import { UserRole } from '../../types/user.types';
import { MenuItem } from '../../types/menuItem.types';

export type MenuItemCardProps = {
    menuItem: MenuItem;
    role: UserRole;
    quantity?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onAddToCart?: () => void;
};
