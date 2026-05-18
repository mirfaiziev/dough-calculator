import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { NeapolitanContext } from "../context";
import { ActionType } from "../types";
import { fmt, parseNum } from "./parseNum";

const Servings = () => {
    const { view, dispatch } = useContext(NeapolitanContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.ChangeServings, payload: parseNum(e.target.value) });
    };

    return (
        <Form.Group className="col-sm-3 py-2">
            <Form.Label>Servings</Form.Label>
            <Form.Control type="text" value={fmt(view.servings, 1)} onChange={handleChange} />
        </Form.Group>
    );
};

export default Servings;
