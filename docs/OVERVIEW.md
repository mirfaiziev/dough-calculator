# Dough Calculator — Overview

Small React + TypeScript single-page app. Calculates dough proportions (flour, water, total weight) for given hydration %. Change any field, other three recompute via reducer.

The app supports multiple **presets** (selectable via a top-level dropdown). Each preset is a self-contained module (own state shape, reducer, form). Currently shipped presets:

- `base` — generic dough calculator (hydration / flour / water / total).
- `neapolitan` — Neapolitan pizza. Adds poolish (опара), ball weight + servings, salt %.

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
| `npm test` | Run Vitest unit tests (currently covers `neapolitan/calc.ts`) |

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
  App.tsx                    Layout + preset dropdown + active preset render
  presets/
    types.ts                 Preset interface { id, label, Form }
    registry.ts              Array of all presets, drives the dropdown
    base/                    Base preset — current calculator
      types.ts               State, Action union, ActionType enum
      defaults.ts            hydration 60, flour 500, water 300, total 800
      reducer.ts             4 handlers, one per field
      context.ts             React Context for state/dispatch
      Form.tsx               Root form: useReducer + Provider + fields
      fields/
        Hydration.tsx        % input
        FlourWeight.tsx      grams input
        WaterWeight.tsx      grams input
        TotalDoughWeight.tsx grams input
      index.ts               Preset export: { id, label, Form }
    neapolitan/              Neapolitan pizza preset
      types.ts               Canonical state + actions + view interfaces
      defaults.ts            70% h, 460g total (2×230g), poolish on (200g @ 100%), salt 2.5%
      calc.ts                Pure module: derive(state) + apply*Change(state, payload)
      calc.test.ts           Vitest unit tests for derive + every apply*
      reducer.ts             Dispatches actions to calc.apply* functions
      context.ts             React Context (view + dispatch)
      Form.tsx               Root form, useReducer + Provider, conditional poolish row
      fields/
        parseNum.ts          Shared input parser / formatter
        NumberField.tsx      Generic prop-driven number input; omit onChange → read-only
        PoolishToggle.tsx    Bootstrap Form.Check switch (different UI from NumberField)
      index.ts               Preset export: { id, label, Form }
public/
  favicons                   (served as-is, copied to dist/)
.github/workflows/
  deploy.yml                 Build + deploy to GitHub Pages
```

## Preset Architecture

`Preset` interface (`src/presets/types.ts`):

```ts
interface Preset {
  id: string;
  label: string;
  Form: React.FC;   // self-contained; manages own state internally
}
```

`App.tsx` reads `presets` from `registry.ts`, renders a Bootstrap `Dropdown` to switch active preset, and mounts the active preset's `Form` keyed by `id` (so state resets cleanly on switch).

Each preset owns its state shape and reducer — no shared global store. When a preset diverges from base, copy `base/` files into the preset folder and edit there.

## State Model (base preset)

`AppStateInterface`:
- `hydration` — water/flour ratio %
- `flourWeight` — grams
- `waterWeight` — grams
- `totalDoughWeight` — grams (flour + water)

Held in the preset-local `StoreContext` (`src/presets/base/context.ts`). The preset's `Form.tsx` creates the reducer + provider; field components read `state` + `dispatch` via `useContext`.

## Actions (base preset)

Enum `ActionType`:
- `ChangeHydration`
- `ChangeFlourWeight`
- `ChangeWaterWeight`
- `ChangeTotalDoughWeight`

Each action carries `payload: number`. Union type `AppActionsInterface`.

## Neapolitan Preset

### Mental model

User has a fixed amount of 100% poolish on hand and wants N pizzas at target hydration. The form answers: "how much fresh flour + water to add?"

### Canonical state (minimal independent fields)

```
hydration         %      target overall hydration
total             g      total dough weight (poolish + fresh)
ballWeight        g      per ball
saltPercent       %      of total flour
poolishOn         bool   toggle (defaults true)
poolishMass       g      kept in state even when off (memory)
poolishHydration  %      kept in state even when off
```

### Derived (computed in `calc.derive`)

```
totalFlour   = total / (1 + hydration/100)
totalWater   = total − totalFlour
poolishFlour = poolishOn ? poolishMass / (1 + poolishHydration/100) : 0
poolishWater = poolishOn ? poolishMass − poolishFlour : 0
flour        = totalFlour − poolishFlour       // displayed "fresh flour to add"
water        = totalWater − poolishWater       // displayed "fresh water to add"
servings     = round(total / ballWeight, 0.1)
saltWeight   = totalFlour × saltPercent / 100  // does NOT affect total
```

### Action → invariants

| Action | Fixed | Recomputed (via canonical state) |
|---|---|---|
| ChangeHydration (poolish on) | poolishMass, total | totalFlour, totalWater, flour, water |
| ChangeHydration (poolish off) | totalFlour (= flour) | total, water |
| ChangeFlour (fresh) | hydration, poolish | total via totalFlour = flour + poolishFlour |
| ChangeWater (fresh) | hydration, poolish | total via totalWater = water + poolishWater |
| ChangeTotal | hydration, poolish, ballWeight | flour, water, servings |
| ChangeBallWeight | total, hydration, poolish | servings only |
| ChangeServings | hydration, ballWeight, poolish | total = servings × ballWeight |
| ChangePoolishMass | hydration, total | flour, water (split shifts) |
| ChangePoolishHydration | hydration, total, poolishMass | flour, water (split shifts) |
| ChangeSaltPercent | everything else | saltWeight only |
| TogglePoolish | hydration, total | flour, water; poolishMass/hydration retained in state as memory |

### Why split `calc.ts` from `reducer.ts`

Pure functions, no React imports → directly unit-testable under Vitest. Reducer is a thin switch dispatching to `apply*Change` helpers. Tests live in `calc.test.ts` (23 cases covering defaults, poolish on/off, every action, edge cases like `ballWeight = 0` and `hydration = 0`).

## Calculation Rules (base preset reducer.ts)

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
- No persistence. Reload resets to preset defaults. Switching presets via dropdown also resets state (Form is keyed by preset id).
- `handleWaterWeightChanged` guards `hydration === 0` (returns flour = 0).
- Neapolitan preset currently reuses `base/Form` verbatim — only `id`/`label` differ.
- Vitest wired up. Currently covers Neapolitan `calc.ts`. Base preset reducer not yet covered.

## Entry Points

- Dev: `npm run dev` → http://localhost:5173
- Root mount: `#root` in [index.html](../index.html), script tag loads [src/index.tsx](../src/index.tsx).
