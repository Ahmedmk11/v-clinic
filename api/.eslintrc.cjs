module.exports = {
    parser: 'espree',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
    },
    env: {
        node: true,
    },
    plugins: [],
    rules: {
        'no-undef': 'error',
    },
}
