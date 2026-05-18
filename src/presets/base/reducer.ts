import { ActionType, AppActionsInterface, AppStateInterface } from "./types";

const handleHydrationChanged = (state: AppStateInterface, hydration: number): AppStateInterface => {
    const flourWeight = state.flourWeight;
    const waterWeight = (hydration / 100) * flourWeight;
    return { hydration, flourWeight, waterWeight, totalDoughWeight: flourWeight + waterWeight };
};

const handleFlourWeightChanged = (state: AppStateInterface, flourWeight: number): AppStateInterface => {
    const hydration = state.hydration;
    const waterWeight = (hydration / 100) * flourWeight;
    return { hydration, flourWeight, waterWeight, totalDoughWeight: flourWeight + waterWeight };
};

const handleWaterWeightChanged = (state: AppStateInterface, waterWeight: number): AppStateInterface => {
    const hydration = state.hydration;
    const flourWeight = hydration === 0 ? 0 : (waterWeight / hydration) * 100;
    return { hydration, flourWeight, waterWeight, totalDoughWeight: flourWeight + waterWeight };
};

const handleTotalDoughWeightChanged = (state: AppStateInterface, totalDoughWeight: number): AppStateInterface => {
    const hydration = state.hydration;
    const weightUnit = totalDoughWeight / (hydration + 100);
    const flourWeight = weightUnit * 100;
    const waterWeight = weightUnit * hydration;
    return { hydration, flourWeight, waterWeight, totalDoughWeight };
};

const reducer = (state: AppStateInterface, action: AppActionsInterface): AppStateInterface => {
    switch (action.type) {
        case ActionType.ChangeHydration:
            return handleHydrationChanged(state, action.payload);
        case ActionType.ChangeFlourWeight:
            return handleFlourWeightChanged(state, action.payload);
        case ActionType.ChangeWaterWeight:
            return handleWaterWeightChanged(state, action.payload);
        case ActionType.ChangeTotalDoughWeight:
            return handleTotalDoughWeightChanged(state, action.payload);
        default:
            return state;
    }
};

export default reducer;
