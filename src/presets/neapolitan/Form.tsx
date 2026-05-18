import { Form as BsForm, Row } from "react-bootstrap";
import { useMemo, useReducer } from "react";
import { NeapolitanContext } from "./context";
import reducer from "./reducer";
import defaults from "./defaults";
import { derive } from "./calc";
import Hydration from "./fields/Hydration";
import FlourWeight from "./fields/FlourWeight";
import WaterWeight from "./fields/WaterWeight";
import TotalDoughWeight from "./fields/TotalDoughWeight";
import BallWeight from "./fields/BallWeight";
import Servings from "./fields/Servings";
import SaltPercent from "./fields/SaltPercent";
import SaltWeight from "./fields/SaltWeight";
import PoolishToggle from "./fields/PoolishToggle";
import PoolishMass from "./fields/PoolishMass";
import PoolishHydration from "./fields/PoolishHydration";

const NeapolitanForm = () => {
    const [state, dispatch] = useReducer(reducer, defaults);
    const view = useMemo(() => ({ ...state, ...derive(state) }), [state]);

    return (
        <NeapolitanContext.Provider value={{ view, dispatch }}>
            <BsForm className="py-4">
                    <Hydration />
                    <PoolishToggle />
                    {view.poolishOn && (
                    <Row>
                        <PoolishMass />
                        <PoolishHydration />
                    </Row>
                )}
                    <FlourWeight />
                    <WaterWeight />
                    <Row>
                        <SaltPercent />
                        <SaltWeight />
                    </Row>


                <TotalDoughWeight />
                <BallWeight />
                <Servings />

            </BsForm>
        </NeapolitanContext.Provider>
    );
};

export default NeapolitanForm;
