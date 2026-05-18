import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { NeapolitanContext } from "../context";
import { ActionType } from "../types";
import { fmt, parseNum } from "./parseNum";

const FlourWeight = () => {
    const { view, dispatch } = useContext(NeapolitanContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.ChangeFlour, payload: parseNum(e.target.value) });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Label>Fresh flour (g)</Form.Label>
            <Form.Control type="text" value={fmt(view.flour)} onChange={handleChange} />
        </Form.Group>
    );
};

export default FlourWeight;
