/** Form input values required to create a new restaurant. */
export type AddRestaurantFormValues = {
    /** The image URL link for the restaurant banner or photo. */
    imageUrl: string;

    /** The official name of the restaurant. */
    name: string;

    /** A short description of the restaurant or its specialties. */
    description: string;

    /** The physical street address location. */
    address: string;

    /** The official contact or helpline phone number. */
    contactNumber: string;

    /** The food classification type */
    category: string;

    /** Daily opening hours timestamp string */
    openingTime: string;

    /** Daily closing hours timestamp string */
    closingTime: string;

    /** Array of active working days selected for the restaurant. */
    operatingDays: string[];
};
