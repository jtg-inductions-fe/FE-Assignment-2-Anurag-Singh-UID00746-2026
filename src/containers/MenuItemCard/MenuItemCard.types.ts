import { UserRole, MenuItem } from '@types';

/** Props for the MenuItemCard component. */
export type MenuItemCardProps = {
    /** Flag to check whether restaurant is opened or not. */
    isOpen: Boolean;

    /** The menu item data model containing details. */
    menuItem: MenuItem;

    /** The active user role used to show or hide action buttons. */
    role: UserRole;

    /** Optional item quantity currently added to the cart. */
    quantity?: number;

    /** Optional callback to increase the item quantity. */
    onIncrement?: () => void;

    /** Optional callback to decrease the item quantity. */
    onDecrement?: () => void;

    /** Optional callback to open the edit menu item form. */
    onEdit?: () => void;

    /** Optional callback to open the delete item confirmation popup. */
    onDelete?: () => void;

    /** Optional callback to add this menu item to the cart. */
    onAddToCart?: () => void;
};
