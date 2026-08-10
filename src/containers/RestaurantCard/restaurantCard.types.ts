import { DiscoveryAction } from '@config/discoveryActions';

import { Restaurant } from '@types';

export type RestaurantCardProps = {
    restaurant: Restaurant;
    actions: DiscoveryAction[];
    isOpen: boolean;
    onCardClick: (restaurant: Restaurant) => void;
    onEdit: (restaurant: Restaurant) => void;
    onDelete: (restaurant: Restaurant) => void;
    canEdit: boolean;
    canDelete: boolean;
};
