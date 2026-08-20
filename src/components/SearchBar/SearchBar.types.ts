/**
 * Represents the type of Search bar's prop.
 */
export type SearchBarProps = {
    /** placeholder for the searchbar */
    placeholder: string;

    /** string typed in the searchbar */
    value: string;

    /** stores the value typed in the searchbar on change */
    onChange: (value: string) => void;
};
