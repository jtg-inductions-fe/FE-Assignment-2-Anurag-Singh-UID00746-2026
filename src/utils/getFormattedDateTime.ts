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
