import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { StoreContext } from "../context";
import { ActionType } from "../types";

const TotalDoughWeight = () => {
    const { state, dispatch } = useContext(StoreContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = 0;
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            value = parseInt(event.target.value);
        }
        dispatch({ type: ActionType.ChangeTotalDoughWeight, payload: value });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Label>Total Dough Weight (grams)</Form.Label>
            <Form.Control type="text" value={state.totalDoughWeight} onChange={handleChange} />
        </Form.Group>
    );
};

export default TotalDoughWeight;
