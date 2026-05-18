# dough-calculator

Calculator for the properties of the dough.

Live: https://mirfaiziev.github.io/dough-calculator/

## Stack

React 18 + TypeScript + Vite + react-bootstrap.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages.

One-time setup in repo settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The Vite `base` is set to `/dough-calculator/` in `vite.config.ts`. If the repo is renamed, update both.

## Docs

See [docs/OVERVIEW.md](docs/OVERVIEW.md).
