module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    amd: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-require-imports': false,
  },
};
