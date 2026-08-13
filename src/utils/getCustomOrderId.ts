import { customAlphabet } from 'nanoid';

/**
 * Creates a unique random 5-digit number order ID prefixed with "BG".
 * @returns A unique identifier string.
 */
export const generateOrderId = () => {
    const id = customAlphabet('123456789', 5)();

    return `BG${id}`;
};
