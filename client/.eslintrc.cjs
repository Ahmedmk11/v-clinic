module.exports = {
    parser: 'espree',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    plugins: ['react'],
    rules: {
        'react/jsx-no-undef': 'error',
        'no-undef': 'error',
    },
}
