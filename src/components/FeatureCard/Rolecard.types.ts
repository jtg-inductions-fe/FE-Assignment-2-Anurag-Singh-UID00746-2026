/**
 * Represents the type of Rolecard's prop.
 */
export interface RoleCardProps {
    /** Image url */
    image: string;

    /** Main heading of the card */
    title: string;

    /** Optional selected flag for the active card */
    selected?: boolean;

    /** Optional function which will be triggered on clicking the card */
    onClick?: () => void;
}
