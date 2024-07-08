import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: ['**/node_modules/', 'index.js'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
];
