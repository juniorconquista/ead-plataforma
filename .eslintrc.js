module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['import', 'jsx-a11y', 'react', 'jest', 'react-hooks'],
    extends: [
        'airbnb',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
    ],
    globals: {
        UnityIntegration: true,
    },
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    rules: {
        // Be able to make only one named export
        'import/prefer-default-export': 'off',

        'import/no-named-as-default': 'off',

        // Don't alow ".jsx"
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

        // Allow use before definition
        'no-use-before-define': 'off',

        // Airbnb enforces input nesting and id linking, this is too strict
        // These following two rules make only one strategy required
        'jsx-a11y/label-has-for': [
            'error',
            {
                components: [],
                required: {
                    some: ['nesting', 'id'],
                },
                allowChildren: false,
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                labelComponents: [],
                labelAttributes: [],
                controlComponents: [],
                depth: 25,
            },
        ],

        // Airbnb makes this an error
        // Make it a warning temporarily while we refactor the code
        'react/destructuring-assignment': ['warn', 'always'],
        'no-underscore-dangle': [
            2,
            {
                allow: [
                    '_id',
                    '__REDUX_DEVTOOLS_EXTENSION__',
                    '_locale',
                    '_data',
                    '_errors',
                    '_hasValidationError',
                ],
            },
        ],
        'no-param-reassign': 0,
        'no-shadow': 'off',
        semi: ['error', 'always'],
        'no-array-index-key': 'off',
        'prefer-stateless-function': [0, { ignorePureComponents: true }],
        'react-hooks/rules-of-hooks': 'error',
    },
};
