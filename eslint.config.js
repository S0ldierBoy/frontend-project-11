import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  { ...pluginJs.configs.recommended },
  {
    ignores: ['dist'],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
    },
  },
];
