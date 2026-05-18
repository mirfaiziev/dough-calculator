import {
    applyBallWeightChange,
    applyFlourChange,
    applyHydrationChange,
    applyPoolishHydrationChange,
    applyPoolishMassChange,
    applyPoolishToggle,
    applySaltPercentChange,
    applyServingsChange,
    applyTotalChange,
    applyWaterChange,
} from "./calc";
import { ActionType, NeapolitanAction, NeapolitanState } from "./types";

const reducer = (state: NeapolitanState, action: NeapolitanAction): NeapolitanState => {
    switch (action.type) {
        case ActionType.ChangeHydration:
            return applyHydrationChange(state, action.payload);
        case ActionType.ChangeFlour:
            return applyFlourChange(state, action.payload);
        case ActionType.ChangeWater:
            return applyWaterChange(state, action.payload);
        case ActionType.ChangeTotal:
            return applyTotalChange(state, action.payload);
        case ActionType.ChangeBallWeight:
            return applyBallWeightChange(state, action.payload);
        case ActionType.ChangeServings:
            return applyServingsChange(state, action.payload);
        case ActionType.ChangePoolishMass:
            return applyPoolishMassChange(state, action.payload);
        case ActionType.ChangePoolishHydration:
            return applyPoolishHydrationChange(state, action.payload);
        case ActionType.ChangeSaltPercent:
            return applySaltPercentChange(state, action.payload);
        case ActionType.TogglePoolish:
            return applyPoolishToggle(state, action.payload);
        default:
            return state;
    }
};

export default reducer;
