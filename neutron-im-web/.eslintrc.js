module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  overrides: [
    {
      files: ['./src/**/*.tsx', './src/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 11,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint', 'react', 'prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended',
        'react-app',
        'prettier',
      ],
      rules: {
        'react/react-in-jsx-scope': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
};
