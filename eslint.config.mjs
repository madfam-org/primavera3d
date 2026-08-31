// Root ESLint flat config (ESLint 9).
//
// This file used to be a legacy `.eslintrc`-style config (`module.exports = {
// extends: [...] }`) that happened to be named `eslint.config.js` — so ESLint 9
// loaded it as flat config and rejected the `extends` key, which broke every
// bare `eslint` invocation from the repo root (and, through lint-staged, blocked
// commits). Each app and package carries its own flat config and CI lints them
// via `turbo run lint`; this root config exists only to cover the handful of
// loose root-level files (config/scripts/test harness) so they are linted too.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Everything with its own eslint.config.* is linted there, not here.
    ignores: [
      'apps/**',
      'packages/**',
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '.turbo/**',
      'coverage/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node globals used by the root config/script/test files.
        process: 'readonly',
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // package.json has no "type": "module", so bare `.js`/`.cjs` at the root
    // (commitlint.config.js, scripts/check-env.js) are legitimately CommonJS —
    // their `module.exports` / `require()` are correct, not lint violations.
    files: ['**/*.js', '**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);
