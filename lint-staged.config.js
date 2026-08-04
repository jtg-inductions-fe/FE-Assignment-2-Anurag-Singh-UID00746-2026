/* This configuration applies Prettier formatting and ESLint linting to all staged `.ts` and `.tsx` files */
export default {
    // eslint will only run on staged files
    'src/**/*.{ts,tsx}': ['eslint --fix'],

    // Prettier should run only on staged files, not on the whole project
    '*': ['prettier --write --ignore-unknown'],
};
