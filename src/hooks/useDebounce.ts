import { useEffect, useState } from 'react';

/**
 * A hook that delays updating a value until a certain amount of time has passed.
 * Useful for stopping rapid API calls during search text input typing.
 * @param value - The input value that changes quickly.
 * @param delay - The wait time in milliseconds before updating the value.
 * @returns The delayed value that only updates after the timer finishes.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
};
