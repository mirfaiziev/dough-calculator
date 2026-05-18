import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { NeapolitanContext } from "../context";
import { ActionType } from "../types";
import { fmt, parseNum } from "./parseNum";

const SaltPercent = () => {
    const { view, dispatch } = useContext(NeapolitanContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.ChangeSaltPercent, payload: parseNum(e.target.value) });
    };

    return (
        <Form.Group className="col-6 col-sm-3 py-2">
            <Form.Label>Salt (% of flour)</Form.Label>
            <Form.Control type="text" value={fmt(view.saltPercent, 2)} onChange={handleChange} />
        </Form.Group>
    );
};

export default SaltPercent;
