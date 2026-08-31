// lint-staged config.
//
// Prettier formats everything. ESLint --fix runs on source only: linting the
// flat-config files themselves (eslint.config.js) from the repo root makes
// ESLint 9 build a config whose plugin chain (react-hooks' recommended preset)
// still carries a legacy `extends` key, which flat config rejects — so a commit
// that merely touched an eslint.config.js aborted with a confusing error. Those
// files are configuration, not lintable source, so exclude them from the eslint
// rule; CI still lints all real source via `turbo run lint`.

const isConfigFile = (f) => /(^|\/)(eslint\.config|lint-staged\.config)\.[cm]?js$/.test(f);

export default {
  "*.{js,jsx,ts,tsx}": (files) => {
    const lintable = files.filter((f) => !isConfigFile(f));
    const tasks = ["prettier --write " + files.map((f) => `'${f}'`).join(" ")];
    if (lintable.length) {
      tasks.push(
        "eslint --fix --max-warnings 0 --no-warn-ignored " +
          lintable.map((f) => `'${f}'`).join(" "),
      );
    }
    return tasks;
  },
  "*.{json,md,mdx,css,scss}": (files) =>
    "prettier --write " + files.map((f) => `'${f}'`).join(" "),
};
