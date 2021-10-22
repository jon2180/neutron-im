module.exports = {
  env: {
    es2021: true,
    browser: false,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    camelcase: 'off',
    'max-len': ['error', { code: 120 }],
    // 'no-useless-constructor': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      // 解决 tsconfig 下的 path 别名导致 eslint 插件无法解决的 bug
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
