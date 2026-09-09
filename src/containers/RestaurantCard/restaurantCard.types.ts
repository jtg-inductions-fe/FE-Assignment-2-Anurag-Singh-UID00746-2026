import { DiscoveryAction } from '@containers/Home/discoveryActions';
import { RestaurantResponse } from '../../types/restaurant.types';

/** Props for the RestaurantCard component. */
export type RestaurantCardProps = {
    /** The restaurant data model object containing. */
    restaurant: RestaurantResponse;

    /** Array of allowed discovery action settings for this card. */
    actions: DiscoveryAction[];

    /** Indicates whether the restaurant is currently open for business today. */
    isOpen: boolean;

    /** Callback function triggered when the user clicks anywhere on the main card surface. */
    onCardClick: (restaurant: RestaurantResponse) => void;

    /** Callback function triggered when the user clicks the edit button action. */
    onEdit: (restaurant: RestaurantResponse) => void;

    /** Callback function triggered when the user clicks the delete button action. */
    onDelete: (restaurant: RestaurantResponse) => void;

    /** Toggles the conditional rendering visibility of the edit icon button interface. */
    canEdit: boolean;

    /** Toggles the conditional rendering visibility of the delete icon button interface. */
    canDelete: boolean;
};
