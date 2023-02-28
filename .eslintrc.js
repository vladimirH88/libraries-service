module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        groups: ['builtin', 'internal', 'external'],
        pathGroups: [
          { pattern: '@nest*/**', group: 'builtin', position: 'before' },
          { pattern: 'typeorm', group: 'internal', position: 'before' },
          { pattern: 'express', group: 'builtin', position: 'before' },
          { pattern: 'node*', group: 'internal', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'internal'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
  },
};
