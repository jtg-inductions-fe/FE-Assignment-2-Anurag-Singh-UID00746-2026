/** Form input values used to update an existing restaurant. */
export type EditRestaurantFormValues = {
    /** Optional new image URL link for the restaurant banner photo. */
    imageUrl?: string;

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
