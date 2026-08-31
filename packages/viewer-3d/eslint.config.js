import { config as reactConfig } from "@repo/eslint-config/react-internal";

/**
 * This package is built on react-three-fiber, whose JSX is a custom reconciler
 * namespace — <mesh>, <pointLight>, <meshStandardMaterial args=… metalness=… />
 * and friends are Three.js objects, not DOM elements. eslint-plugin-react's
 * `react/no-unknown-property` only knows the DOM property set, so it flags every
 * one of those valid R3F props as "unknown". Turning it off for this package is
 * the standard R3F posture; it stays on everywhere else via the shared config.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...reactConfig,
  {
    rules: {
      "react/no-unknown-property": "off",
    },
  },
];
