import { UserRole, MenuItem } from '@types';

/** Props for the MenuItemCard component. */
export type MenuItemCardProps = {
    /** Flag to check whether restaurant is opened or not. */
    isOpen: Boolean;

    /** The menu item data model containing details. */
    menuItem: MenuItem;

    /** The active user role used to show or hide action buttons. */
    role: UserRole;

    /** Optional callback to open the edit menu item form. */
    onEdit?: () => void;

    /** Optional callback to open the delete item confirmation popup. */
    onDelete?: () => void;

    /** Optional callback to add this menu item to the cart. */
    onAddToCart?: () => void;
};
