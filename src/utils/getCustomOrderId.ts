import { customAlphabet } from 'nanoid';

export const generateOrderId = () => {
    const id = customAlphabet('123456789', 5)();

    return `BG${id}`;
};
