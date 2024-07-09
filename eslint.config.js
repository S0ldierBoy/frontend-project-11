import globals from 'globals';
import pluginJs from '@eslint/js';
//import { rule } from 'postcss';

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
