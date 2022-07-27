import {Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainForm from "./components/MainForm";
import StoreContextProvider from "./contexts/StoreContextProvider";

const App = () => {
    return (
        <StoreContextProvider>
            <div className="p-5">
                <Container>
                    <h1>Dough calculator</h1>

                    <Row>
                        <Col>
                            <MainForm></MainForm>
                        </Col>
                    </Row>

                </Container>
            </div>
        </StoreContextProvider>
    )
}

export default App