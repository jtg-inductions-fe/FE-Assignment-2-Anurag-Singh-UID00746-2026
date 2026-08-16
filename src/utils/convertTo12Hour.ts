export const convertTo12Hour = (timeString: string) => {
    if (!timeString) return '';

    const [hoursStr, minutesStr] = timeString.split(':');

    let hours = parseInt(hoursStr);
    const minutes = minutesStr;

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
};
