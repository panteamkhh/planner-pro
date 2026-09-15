# Contributing to Professional Planner

Thanks for taking the time to contribute! 🎉

## Ways to contribute

- 🐛 Report a bug (use the *Bug report* issue template)
- 💡 Suggest a feature (use the *Feature request* template)
- 🌍 Improve translations
- 🎨 Add a theme or layout style
- 📝 Improve documentation

## Development

The project is pure HTML/CSS/vanilla JS with **no dependencies**.

```bash
npm start        # serve on http://localhost:5173
```

Edit `js/app.js` (Persian source of truth), then regenerate the English version and the single-file build:

```bash
npm run build     # translate.js + build.js
```

- `scripts/translate.js` generates `js/app.en.js` from `js/app.js`.
- `scripts/build.js` inlines everything into `planner-bilingual.html`.

> If you add new Persian UI text, add its English equivalent to the dictionary in `scripts/translate.js` so the English build stays complete (the script reports leftover Persian text).

## Pull requests

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`.
2. Keep changes focused and small.
3. Run `npm run build` before committing and make sure it reports **0 leftover** Persian tokens.
4. Verify the app still renders all sections in **both** languages.
5. Open a PR and fill in the template.

## Style

- 2-space indentation, LF line endings, UTF-8.
- Prefer readable vanilla JS; no frameworks or build step for the app itself.
- Do not add runtime dependencies.

## Code of Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
