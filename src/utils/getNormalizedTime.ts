export const normalizeTimeValue = (time: string) => {
    if (!time) {
        return '';
    }

    const normalizedTime = time.trim().toLowerCase();
    const [clockTime, period] = normalizedTime.split(' ');

    if (!clockTime || !period) {
        return clockTime ?? '';
    }

    const [hours, minutes] = clockTime.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return clockTime;
    }

    const isPm = period === 'pm';
    const hoursIn24Format =
        isPm && hours !== 12 ? hours + 12 : hours === 12 && !isPm ? 0 : hours;

    return `${String(hoursIn24Format).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
