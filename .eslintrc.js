module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'consistent-return': 0,
    'no-useless-escape': 2,
    'no-console': 'error',
    'max-len': ['warn', { code: 100 }],

    // jest
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};
