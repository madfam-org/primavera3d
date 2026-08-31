// lint-staged config.
//
// Prettier formats everything. `eslint --fix` is deliberately narrow: from the
// repo root, bare ESLint 9 can only lint the flat-config packages
// (packages/ui, packages/utils, packages/viewer-3d). Two things it must NOT be
// pointed at, both because they resolve a config carrying a legacy `extends`
// key that flat config rejects with a confusing error:
//
//  1. Config definitions themselves — a per-package `eslint.config.*`, or any
//     source of the shared `@repo/eslint-config` package (base.js / next.js /
//     react-internal.js), whose plugin chain (react-hooks' recommended preset,
//     eslint-config-next) carries `extends`.
//  2. Files under the Next.js apps (apps/web, apps/docs). Their
//     `eslint.config.mjs` pulls `eslint-config-next`, which is eslintrc-style
//     `extends` — that's why the apps lint via `next lint` (which shims the
//     compat layer), never bare eslint. CI lints them via `turbo run lint`.
//
// Everything excluded here is still prettier-formatted, and still fully linted
// in CI through each package/app's own `lint` script.

const skipEslint = f =>
  /(^|\/)(eslint\.config|lint-staged\.config)\.[cm]?js$/.test(f) ||
  /(^|\/)packages\/eslint-config\/[^/]+\.[cm]?js$/.test(f) ||
  /(^|\/)apps\/(web|docs)\//.test(f);

export default {
  '*.{js,jsx,ts,tsx}': files => {
    const lintable = files.filter(f => !skipEslint(f));
    const tasks = ['prettier --write ' + files.map(f => `'${f}'`).join(' ')];
    if (lintable.length) {
      tasks.push(
        'eslint --fix --max-warnings 0 --no-warn-ignored ' + lintable.map(f => `'${f}'`).join(' ')
      );
    }
    return tasks;
  },
  '*.{json,md,mdx,css,scss}': files => 'prettier --write ' + files.map(f => `'${f}'`).join(' '),
};
