import {ActionType, AppActionsInterface, AppStateInterface} from "../types/interfaces";

const reducer = (state: AppStateInterface, action: AppActionsInterface) => {
    switch (action.type) {
        case ActionType.ChangeHydration:
            return {...state, hydration: action.payload}
        default:
            return state
    }
}

export default reducer