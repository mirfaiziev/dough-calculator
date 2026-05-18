import { Form } from "react-bootstrap";
import { useContext } from "react";
import { NeapolitanContext } from "../context";
import { fmt } from "./parseNum";

const SaltWeight = () => {
    const { view } = useContext(NeapolitanContext);

    return (
        <Form.Group className="col-6 col-sm-3 py-2">
            <Form.Label>Salt Weight (g)</Form.Label>
            <Form.Control type="text" value={fmt(view.saltWeight, 1)} readOnly disabled />
        </Form.Group>
    );
};

export default SaltWeight;
