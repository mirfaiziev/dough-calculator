import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { StoreContext } from "../context";
import { ActionType } from "../types";

const WaterWeight = () => {
    const { state, dispatch } = useContext(StoreContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = 0;
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            value = parseInt(event.target.value);
        }
        dispatch({ type: ActionType.ChangeWaterWeight, payload: value });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Label>Water Weight (grams)</Form.Label>
            <Form.Control type="text" value={state.waterWeight} onChange={handleChange} />
        </Form.Group>
    );
};

export default WaterWeight;
