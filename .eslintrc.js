module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {},
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:prettier/recommended', 'prettier', 'prettier/@typescript-eslint'],
    env: {
        node: true,
        es6: true
    },
    rules: {},
    overrides: []
};
