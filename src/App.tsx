import { Col, Container, Dropdown, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { presets } from "./presets/registry";

const App = () => {
    const [activeId, setActiveId] = useState(presets[0].id);
    const active = presets.find((p) => p.id === activeId) ?? presets[0];
    const ActiveForm = active.Form;

    return (
        <div className="p-5">
            <Container>
                <h1>Dough calculator</h1>

                <Dropdown
                    className="py-3"
                    onSelect={(key) => {
                        if (key) setActiveId(key);
                    }}
                >
                    <Dropdown.Toggle variant="primary">{active.label}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {presets.map((p) => (
                            <Dropdown.Item key={p.id} eventKey={p.id} active={p.id === activeId}>
                                {p.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Row>
                    <Col>
                        <ActiveForm key={activeId} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;
