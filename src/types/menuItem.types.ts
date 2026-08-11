/** A food or drink item on a restaurant's menu. */
export type MenuItem = {
    /** The unique ID of the menu item. */
    id: string;

    /** The name of the food or drink. */
    name: string;

    /** A short text describing the menu item. */
    description: string;

    /** The image URL link for the food photo. */
    image: string;

    /** How much a single item costs. */
    price: number;

    /** True if the food is vegetarian. */
    isVeg: boolean;

    /** How many units of this item are available in store. */
    stock: number;
};
