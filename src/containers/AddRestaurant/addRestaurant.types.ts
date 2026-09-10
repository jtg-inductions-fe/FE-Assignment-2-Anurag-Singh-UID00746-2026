/**
 * Form input values required to create a new restaurant.
 */
export type AddRestaurantFormValues = {
    /** The image URL link for the restaurant banner or photo. */
    imageUrl: string;

    /** The official name of the restaurant. */
    name: string;

    /** A short description of the restaurant or its specialties. */
    description: string;

    /** The complete physical address of the restaurant. */
    address: {
        /** The primary street address of the restaurant. */
        addressLine1: string;

        /** Additional address information such as landmark, floor, or building. */
        addressLine2?: string | null;

        /** The city where the restaurant is located. */
        city: string;

        /** The state or region where the restaurant is located. */
        state: string;

        /** The postal or ZIP code of the restaurant location. */
        postalCode: string;

        /** The country where the restaurant is located. */
        country: string;
    };

    /** The official contact or helpline phone number. */
    contactNumber: string;

    /** The food classification type. */
    category: string;

    /** Daily opening hours timestamp string. */
    openingTime: string;

    /** Daily closing hours timestamp string. */
    closingTime: string;

    /** Array of active working days selected for the restaurant. */
    operatingDays: string[];
};
