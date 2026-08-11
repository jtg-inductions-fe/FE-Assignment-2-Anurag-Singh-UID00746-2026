/** Props for the CategoryCard component. */
export type CategoryCardProps = {
    /** Source URL for the thumbnail image. */
    image: string;

    /** Main heading text. */
    title: string;

    /** Secondary descriptive text under the title. */
    subtitle: string;

    /** Toggles active visual highlight state. */
    selected?: boolean;

    /** Click event handler for the card surface. */
    onClick?: () => void;
};
