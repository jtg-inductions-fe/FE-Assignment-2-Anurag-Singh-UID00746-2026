import Customer from '@assets/images/customer.webp';
import RestaurantPartner from '@assets/images/restaurant-partner.webp';
import { USER_ROLE } from '@components/constants';

export const ROLECARD = [
    {
        value: USER_ROLE.CUSTOMER,
        title: 'Customer',
        image: Customer,
    },

    {
        value: USER_ROLE.OWNER,
        title: 'Partner',
        image: RestaurantPartner,
    },
];
