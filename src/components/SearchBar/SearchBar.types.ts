/**
 * Represents the type of Search bar's prop.
 */
export type SearchBarProps = {
    /** placeholder for the searchbar */
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
};
