# Possible Improvements

Backlog of ideas. Roughly in order of value/effort.

## Features

### 1. Persist state to localStorage
Reload currently resets to preset defaults. Save canonical state per-preset under a key (e.g. `dough-calculator:neapolitan`); read on mount. ~10 lines via `useEffect`.

### 2. Share recipe via URL
Encode canonical state into query string (`?s=<base64-json>` or explicit params). Opening the link restores the recipe. Useful for sharing with friends.

### 3. More presets
Stack already supports it — add a folder under `src/presets/<id>/` + one line in `src/presets/registry.ts`. User mentioned сдоба (sweet dough). Candidates: rye, focaccia, brioche, sourdough.

### 4. Derived info block
Show `poolishFlour` / `poolishWater` as read-only fields when poolish is on, so the user sees exactly what goes into the poolish vs. the fresh add. `NumberField` already supports read-only via omitted `onChange` — cheap now.

### 5. Negative-number clamp
`parseNum` accepts `-50`. Wrap with `Math.max(0, ...)` (or reject in input) for fields where negatives make no physical sense.

### 6. Quick-pick servings
Buttons for 2 / 3 / 4 next to the Servings field — common pizza-night counts. One click dispatches `ChangeServings`.

## Deployment

### 7. Actually enable GitHub Pages
`.github/workflows/deploy.yml` exists but Pages is not enabled in repo settings. Settings → Pages → Source: GitHub Actions. Next push to `main` ships.

## Code quality / debt

### 8. Apply NumberField + calc.ts pattern to `base/`
Mirror the Neapolitan refactor:
- Split `base/reducer.ts` into pure `calc.ts` + thin reducer.
- Add `base/calc.test.ts`.
- Replace 4 field components with `<NumberField>` calls.
- Eventually move `NumberField` + `parseNum` to `src/presets/shared/` once they have a second consumer.

### 9. CI workflow
Add `.github/workflows/ci.yml` running `npm ci && npm test && npm run build` on PRs to `main`. Stops regressions before merge.

### 10. Lint + format
No eslint / prettier config yet. Add to keep style consistent and catch easy bugs (unused vars, missing deps in `useMemo`, etc.).

### 11. Integration tests
`calc.ts` is covered, but the reducer (which maps `ActionType` → `apply*Change`) and the Form (which dispatches actions) are not. A few RTL tests of the full Form would catch wiring regressions.

## Polish

### 12. Mobile layout pass
Already usable on 350px (poolish + salt pair via `col-6 col-sm-3`). Could tighten further — e.g. stack labels inline with inputs to reduce vertical height.

### 13. Branding
Custom favicon for pizza. Page title already "Dough calculator". OG image for shared links.

### 14. PWA / offline
Cache shell so calculator works without network. Vite has a plugin (`vite-plugin-pwa`).
