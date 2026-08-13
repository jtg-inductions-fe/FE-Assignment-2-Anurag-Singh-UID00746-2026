/**
 * Changes an ISO date string into a clean, easy to read text format.
 * @param dateInput - The raw date string from the database.
 * @returns A formatted string, or an empty string if input is missing.
 */
export const formatOrderDateTime = (dateInput: string) => {
    if (!dateInput) return '';

    const dateObj = new Date(dateInput);

    const formattedDate = dateObj
        .toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        .replace(/,/g, '')
        .toUpperCase();

    const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    return `${formattedDate} • ${formattedTime}`;
};
