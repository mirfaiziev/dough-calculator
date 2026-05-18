import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { NeapolitanContext } from "../context";
import { ActionType } from "../types";

const PoolishToggle = () => {
    const { view, dispatch } = useContext(NeapolitanContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.TogglePoolish, payload: e.target.checked });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Check
                type="switch"
                id="poolish-toggle"
                label="Use poolish"
                checked={view.poolishOn}
                onChange={handleChange}
            />
        </Form.Group>
    );
};

export default PoolishToggle;
