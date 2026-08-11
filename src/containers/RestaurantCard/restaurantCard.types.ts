import { DiscoveryAction } from '@config/discoveryActions';

import { Restaurant } from '@types';

/** Props for the RestaurantCard component. */
export type RestaurantCardProps = {
    /** The restaurant data model object containing. */
    restaurant: Restaurant;

    /** Array of allowed discovery action settings for this card. */
    actions: DiscoveryAction[];

    /** Indicates whether the restaurant is currently open for business today. */
    isOpen: boolean;

    /** Callback function triggered when the user clicks anywhere on the main card surface. */
    onCardClick: (restaurant: Restaurant) => void;

    /** Callback function triggered when the user clicks the edit button action. */
    onEdit: (restaurant: Restaurant) => void;

    /** Callback function triggered when the user clicks the delete button action. */
    onDelete: (restaurant: Restaurant) => void;

    /** Toggles the conditional rendering visibility of the edit icon button interface. */
    canEdit: boolean;

    /** Toggles the conditional rendering visibility of the delete icon button interface. */
    canDelete: boolean;
};
