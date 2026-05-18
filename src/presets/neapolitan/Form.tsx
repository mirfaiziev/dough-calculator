import { Form as BsForm, Row } from "react-bootstrap";
import { useMemo, useReducer } from "react";
import { NeapolitanContext } from "./context";
import reducer from "./reducer";
import defaults from "./defaults";
import { derive } from "./calc";
import { ActionType, NeapolitanAction } from "./types";
import NumberField from "./fields/NumberField";
import PoolishToggle from "./fields/PoolishToggle";

const pair = "col-6 col-sm-3 py-2";

const dispatcher = (dispatch: (a: NeapolitanAction) => void, type: NeapolitanAction["type"]) =>
    (payload: number) => dispatch({ type, payload } as NeapolitanAction);

const NeapolitanForm = () => {
    const [state, dispatch] = useReducer(reducer, defaults);
    const view = useMemo(() => ({ ...state, ...derive(state) }), [state]);

    return (
        <NeapolitanContext.Provider value={{ view, dispatch }}>
            <BsForm className="py-4">
                <NumberField
                    label="Hydration (%)"
                    value={view.hydration}
                    onChange={dispatcher(dispatch, ActionType.ChangeHydration)}
                />
                <PoolishToggle />
                {view.poolishOn && (
                    <Row>
                        <NumberField
                            className={pair}
                            label="Weight (g)"
                            value={view.poolishMass}
                            onChange={dispatcher(dispatch, ActionType.ChangePoolishMass)}
                        />
                        <NumberField
                            className={pair}
                            label="Hydration (%)"
                            value={view.poolishHydration}
                            onChange={dispatcher(dispatch, ActionType.ChangePoolishHydration)}
                        />
                    </Row>
                )}
                <NumberField
                    label="Fresh flour (g)"
                    value={view.flour}
                    onChange={dispatcher(dispatch, ActionType.ChangeFlour)}
                />
                <NumberField
                    label="Fresh water (g)"
                    value={view.water}
                    onChange={dispatcher(dispatch, ActionType.ChangeWater)}
                />
                <Row>
                    <NumberField
                        className={pair}
                        label="Salt (% of flour)"
                        value={view.saltPercent}
                        decimals={2}
                        onChange={dispatcher(dispatch, ActionType.ChangeSaltPercent)}
                    />
                    <NumberField
                        className={pair}
                        label="Salt Weight (g)"
                        value={view.saltWeight}
                        decimals={1}
                    />
                </Row>
                <NumberField
                    label="Total Dough Weight (g)"
                    value={view.total}
                    onChange={dispatcher(dispatch, ActionType.ChangeTotal)}
                />
                <NumberField
                    label="Ball Weight (g)"
                    value={view.ballWeight}
                    onChange={dispatcher(dispatch, ActionType.ChangeBallWeight)}
                />
                <NumberField
                    label="Servings"
                    value={view.servings}
                    decimals={1}
                    onChange={dispatcher(dispatch, ActionType.ChangeServings)}
                />
            </BsForm>
        </NeapolitanContext.Provider>
    );
};

export default NeapolitanForm;
