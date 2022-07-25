import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainForm from "./components/MainForm";
import StoreContextProvideer from "./StoreContextProvider";

const App = () => {
    return (
        <StoreContextProvideer>
            <div className="p-5">
                <h1>Dough calculator</h1>

                <Container>
                    <Row>
                        <Col>
                            <MainForm></MainForm>
                        </Col>
                    </Row>

                </Container>
            </div>
        </StoreContextProvideer>
    )
}

export default App