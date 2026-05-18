import { Form } from "react-bootstrap";
import { ChangeEvent } from "react";
import { fmt, parseNum } from "./parseNum";

interface NumberFieldProps {
    label: string;
    value: number;
    decimals?: number;
    className?: string;
    onChange?: (value: number) => void;
}

const NumberField = ({
    label,
    value,
    decimals = 0,
    className = "col-sm-3 py-2",
    onChange,
}: NumberFieldProps) => {
    const handleChange = onChange
        ? (e: ChangeEvent<HTMLInputElement>) => onChange(parseNum(e.target.value))
        : undefined;
    const readOnly = !onChange;
    return (
        <Form.Group className={className}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                value={fmt(value, decimals)}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={readOnly}
            />
        </Form.Group>
    );
};

export default NumberField;
