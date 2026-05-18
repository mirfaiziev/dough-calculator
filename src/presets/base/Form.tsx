import { Form as BsForm } from "react-bootstrap";
import { useReducer } from "react";
import { StoreContext } from "./context";
import reducer from "./reducer";
import defaults from "./defaults";
import Hydration from "./fields/Hydration";
import FlourWeight from "./fields/FlourWeight";
import WaterWeight from "./fields/WaterWeight";
import TotalDoughWeight from "./fields/TotalDoughWeight";

const BaseForm = () => {
    const [state, dispatch] = useReducer(reducer, defaults);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            <BsForm className="py-4">
                <Hydration />
                <FlourWeight />
                <WaterWeight />
                <TotalDoughWeight />
            </BsForm>
        </StoreContext.Provider>
    );
};

export default BaseForm;
