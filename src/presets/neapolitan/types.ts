import React from "react";

// Canonical state — minimal set of independent fields.
// Everything else (rest flour, rest water, servings, salt weight) is derived.
export interface NeapolitanState {
    hydration: number;        // % target overall hydration
    total: number;            // g total dough weight (incl. poolish)
    ballWeight: number;       // g, one ball
    saltPercent: number;      // % of total flour
    poolishOn: boolean;
    poolishMass: number;      // g (kept in state even when off — acts as memory)
    poolishHydration: number; // % (kept in state even when off)
}

export enum ActionType {
    ChangeHydration,
    ChangeFlour,
    ChangeWater,
    ChangeTotal,
    ChangeBallWeight,
    ChangeServings,
    ChangePoolishMass,
    ChangePoolishHydration,
    ChangeSaltPercent,
    TogglePoolish,
}

export type NeapolitanAction =
    | { type: ActionType.ChangeHydration; payload: number }
    | { type: ActionType.ChangeFlour; payload: number }
    | { type: ActionType.ChangeWater; payload: number }
    | { type: ActionType.ChangeTotal; payload: number }
    | { type: ActionType.ChangeBallWeight; payload: number }
    | { type: ActionType.ChangeServings; payload: number }
    | { type: ActionType.ChangePoolishMass; payload: number }
    | { type: ActionType.ChangePoolishHydration; payload: number }
    | { type: ActionType.ChangeSaltPercent; payload: number }
    | { type: ActionType.TogglePoolish; payload: boolean };

export interface NeapolitanDerived {
    flour: number;        // rest flour (fresh, to add) g
    water: number;        // rest water (fresh, to add) g
    servings: number;     // total / ballWeight, rounded to 0.1
    saltWeight: number;   // g — derived from saltPercent + totalFlour
    totalFlour: number;   // g — incl. poolish flour
    totalWater: number;   // g — incl. poolish water
    poolishFlour: number; // g (0 if poolish off)
    poolishWater: number; // g (0 if poolish off)
}

export interface NeapolitanView extends NeapolitanState, NeapolitanDerived {}

export interface NeapolitanContextInterface {
    view: NeapolitanView;
    dispatch: React.Dispatch<NeapolitanAction>;
}
