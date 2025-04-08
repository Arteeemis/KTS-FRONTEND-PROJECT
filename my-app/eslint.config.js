import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'eslint:recommended',
      'prettier',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:react/recommended',
      'plugin:import/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc' },
          pathGroups: [
            {
              pattern: './**/*.scss',
              group: 'sibling',
              position: 'after',
            },
          ],
        },
      ],
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg'],
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      'import/external-module-folders': ['node_modules', 'node_modules/@types'],
      react: {
        version: 'detect',
      },
    },
  },
);
