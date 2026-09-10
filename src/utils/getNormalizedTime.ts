/**
 * Converts a time string into the standard 24-hour HH:mm format
 * required by HTML time inputs.
 *
 * The function supports both 12-hour AM/PM values and 24-hour
 * backend time values. Seconds are removed when they are present.
 *
 * @param time - The raw time string input.
 *
 * @returns A formatted 24-hour time string in HH:mm format,
 * or an empty string if the input is missing or invalid.
 */
export const normalizeTimeValue = (time: string): string => {
    if (!time) {
        return '';
    }

    const normalizedTime = time.trim().toLowerCase();

    if (!normalizedTime.includes('am') && !normalizedTime.includes('pm')) {
        const [hours, minutes] = normalizedTime.split(':');

        if (
            hours === undefined ||
            minutes === undefined ||
            Number.isNaN(Number(hours)) ||
            Number.isNaN(Number(minutes))
        ) {
            return '';
        }

        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    const [clockTime, period] = normalizedTime.split(/\s+/);

    if (!clockTime || !period) {
        return '';
    }

    const [hours, minutes] = clockTime.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return '';
    }

    const isPm = period === 'pm';

    const hoursIn24Format =
        isPm && hours !== 12 ? hours + 12 : hours === 12 && !isPm ? 0 : hours;

    return `${String(hoursIn24Format).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
