import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { StoreContext } from "../context";
import { ActionType } from "../types";

const Hydration = () => {
    const { state, dispatch } = useContext(StoreContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = 0;
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            value = parseInt(event.target.value);
        }
        dispatch({ type: ActionType.ChangeHydration, payload: value });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Label>Hydration (%)</Form.Label>
            <Form.Control type="text" value={state.hydration} onChange={handleChange} />
        </Form.Group>
    );
};

export default Hydration;
