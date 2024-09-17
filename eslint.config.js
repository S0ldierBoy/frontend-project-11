import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'no-param-reassign': ['error', { props: false }],
    },
  },
];

