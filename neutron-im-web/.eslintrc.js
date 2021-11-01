module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  overrides: [
    {
      files: ['./src/**/*.{tsx,ts}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 11,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'prettier',
      ],
      rules: {
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-uses-react': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/jsx-uses-vars': 'error',
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
