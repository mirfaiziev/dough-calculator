# Dough Calculator — Overview

Small React + TypeScript single-page app. Calculates dough proportions (flour, water, total weight) for given hydration %. Change any field, other three recompute via reducer.

## Stack

- React 18
- TypeScript 5 (strict)
- Vite 6 (dev server + bundler)
- react-bootstrap 2 + bootstrap 5 (UI)
- State: `useReducer` + Context (no Redux)

## Scripts

| Cmd | Purpose |
|-----|---------|
| `npm run dev` | Dev server (http://localhost:5173) |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve built `dist/` locally |

## Deployment

GitHub Pages via `.github/workflows/deploy.yml`. Triggers on push to `main`. Build output (`dist/`) uploaded as Pages artifact, deployed by `actions/deploy-pages`.

Vite `base` is `/dough-calculator/` (matches repo name). Asset URLs in `index.html` use `%BASE_URL%` so they resolve correctly under the subpath.

## Layout

```
index.html                   Vite entry (root)
vite.config.ts               Vite config (base = /dough-calculator/)
tsconfig.json                Project references → app + node
tsconfig.app.json            App TS config
tsconfig.node.json           Vite-config TS config
src/
  index.tsx                  React root, StrictMode
  App.tsx                    Layout + StoreContextProvider
  components/
    MainForm.tsx             Wraps 4 input fields
    MainForm/
      Hydration.tsx          % input
      FlourWeight.tsx        grams input
      WaterWeight.tsx        grams input
      TotalDoughWeight.tsx   grams input
  contexts/
    StoreContextProvider.tsx createContext + useReducer
  reducers/
    reducer.ts               4 handlers, one per field
  config/
    defaultValues.ts         hydration 60, flour 500, water 300, total 800
  types/
    interfaces.ts            State, Action union, ActionType enum
public/
  favicons                   (served as-is, copied to dist/)
.github/workflows/
  deploy.yml                 Build + deploy to GitHub Pages
```

## State Model

`AppStateInterface`:
- `hydration` — water/flour ratio %
- `flourWeight` — grams
- `waterWeight` — grams
- `totalDoughWeight` — grams (flour + water)

Single store. Held in `StoreContext`. Components read `state` + `dispatch` via `useContext`.

## Actions

Enum `ActionType`:
- `ChangeHydration`
- `ChangeFlourWeight`
- `ChangeWaterWeight`
- `ChangeTotalDoughWeight`

Each action carries `payload: number`. Union type `AppActionsInterface`.

## Calculation Rules (reducer.ts)

Hydration always preserved when possible. Field user touches drives recompute:

- **Hydration changed** → keep flour. `water = (hydration/100) * flour`. `total = flour + water`.
- **Flour changed** → keep hydration. `water = (hydration/100) * flour`. `total = flour + water`.
- **Water changed** → keep hydration. `flour = (water/hydration) * 100`. `total = flour + water`.
- **Total changed** → keep hydration. `unit = total/(hydration + 100)`. `flour = unit*100`. `water = unit*hydration`.

Hydration % = baker's percentage (water as % of flour weight).

## Data Flow

```
Input onChange
  → parseInt + Number.isInteger guard (empty/NaN → 0)
  → dispatch({ type, payload })
  → reducer recomputes whole state
  → Context re-renders all fields
```

## Gotchas / Notes

- Inputs typed `text` not `number`. Floats rejected (`Number.isInteger` check). Negative ints pass parse.
- No persistence. Reload resets to `defaultValues`.
- Division by zero risk in `handleWaterWeightChanged` when `hydration = 0`.
- `WaterWeight.tsx` handler misnamed `handleFlourWeightChange` (copy-paste; harmless).
- No tests. Vitest not yet wired up.

## Entry Points

- Dev: `npm run dev` → http://localhost:5173
- Root mount: `#root` in [index.html](../index.html), script tag loads [src/index.tsx](../src/index.tsx).
