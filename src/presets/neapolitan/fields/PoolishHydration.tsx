import { Form } from "react-bootstrap";
import { ChangeEvent, useContext } from "react";
import { NeapolitanContext } from "../context";
import { ActionType } from "../types";
import { fmt, parseNum } from "./parseNum";

const PoolishHydration = () => {
    const { view, dispatch } = useContext(NeapolitanContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionType.ChangePoolishHydration, payload: parseNum(e.target.value) });
    };

    return (
        <Form.Group className="col-6 col-sm-3 py-2">
            <Form.Label>Poolish (%)</Form.Label>
            <Form.Control type="text" value={fmt(view.poolishHydration)} onChange={handleChange} />
        </Form.Group>
    );
};

export default PoolishHydration;
