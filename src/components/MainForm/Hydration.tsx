import {Form} from "react-bootstrap";
import {useContext} from "react";
import {StoreContext} from "../../StoreContextProvider";

const Hydration = () => {
    const {hydration} = useContext(StoreContext)

    console.log(hydration)


    return (
        <Form.Group className={"col-sm-3 py-2"}>
            <Form.Label>Hydration</Form.Label>
            <Form.Control type="text" ></Form.Control>
        </Form.Group>
    )
}

export default Hydration