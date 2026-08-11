/** An item that is inside the shopping cart. */
export type CartItem = {
    /** The unique ID of the food item. */
    id: string;

    /** The ID of the restaurant that sells this food item. */
    restaurantId: string;

    /** The name of the food. */
    name: string;

    /** A short text describing the food. */
    description: string;

    /** The image URL link for the food photo. */
    image: string;

    /** How much a single item costs. */
    price: number;

    /** True if the food is vegetarian. */
    isVeg: boolean;

    /** How many of this item the user wants to buy. */
    quantity: number;
};
