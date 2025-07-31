// eslint.config.mjs (.js/.cjs)

// import globals from 'globals';
// import pluginJs from '@eslint/js';

// export default [
//   pluginJs.configs.recommended,
//   {
//     files: ['src/**/*.js'],
//     languageOptions: { globals: globals.node },
//     rules: {
//       semi: 'error',
//       'no-unused-vars': ['error', { args: 'none' }],
//       'no-undef': 'error',
//     },
//   },
// ];

/////////////////////

// eslint.config.js

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

export default [
  pluginJs.configs.recommended,

  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      // твої правила
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',

      // додано для ESM: вимагає вказувати .js в імпортах
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
        },
      },
    },
  },
];
