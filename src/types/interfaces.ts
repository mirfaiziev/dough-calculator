import React from "react";

export interface AppStateInterface {
    hydration: number,
    flourWeight: number,
    waterWeight: number,
    totalDoughWeight: number
}

export enum ActionType {
    ChangeHydration,
    ChangeFlourWeight,
    ChangeWaterWeight,
    ChangeTotalDoughWeight
}

export interface ChangeHydrationActionInterface {
    type: ActionType.ChangeHydration
    payload: number
}

export interface ChangeFlourWeightActionInterface {
    type: ActionType.ChangeFlourWeight
    payload: number
}
export interface ChangeWaterWeightActionInterface {
    type: ActionType.ChangeWaterWeight
    payload: number
}
export interface ChangeTotalDoughWeighActionInterface {
    type: ActionType.ChangeTotalDoughWeight
    payload: number
}


export type AppActionsInterface =  | ChangeHydrationActionInterface
| ChangeFlourWeightActionInterface
| ChangeWaterWeightActionInterface
| ChangeTotalDoughWeighActionInterface

export interface AppContextInterface {
    state: AppStateInterface,
    dispatch: React.Dispatch<AppActionsInterface>
}