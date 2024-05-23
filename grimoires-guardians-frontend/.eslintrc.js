module.exports = {
    extends: ['react-app', 'eslint:recommended'],
    rules: {
        'react/no-deprecated': 'off',
        'react/no-unsafe': 'off'
    },
    overrides: [
        {
            files: ['**/node_modules/**/*.js'],
            rules: {
                'react/no-deprecated': 'off',
                'react/no-unsafe': 'off'
            }
        }
    ]
};
