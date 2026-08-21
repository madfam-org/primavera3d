import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import { config as baseConfig } from './base.js';

/**
 * A shared ESLint configuration for React component libraries built on
 * React Three Fiber. It extends the react-internal config but disables
 * `react/no-unknown-property`, because R3F intentionally uses Three.js
 * element props (e.g. `position`, `intensity`, `castShadow`, `args`) that
 * eslint-plugin-react flags as unknown DOM properties.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      'react/react-in-jsx-scope': 'off',
      // React Three Fiber uses Three.js element props, not DOM props.
      'react/no-unknown-property': 'off',
    },
  },
];

export default config;
