import { LoginCredential } from '../features/auth/auth.types';
import { users } from '../mock/user';

export const authService = {
    login: async ({ email }: LoginCredential) => {
        await new Promise((res) => setTimeout(res, 2000));

        const validated = users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase(),
        );

        if (!validated) {
            throw new Error('Invalid email or password');
        }

        return validated;
    },
};
