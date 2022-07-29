import {Form} from "react-bootstrap";
import {ChangeEvent, useContext} from "react";
import {StoreContext} from "../../contexts/StoreContextProvider";
import {ActionType, AppContextInterface} from "../../types/interfaces";

const Hydration = () => {
    const {state, dispatch} = useContext<AppContextInterface>(StoreContext)

    const handleHydrationChange = (event: ChangeEvent<HTMLInputElement>) => {
        let hydration = 0
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            hydration = parseInt(event.target.value)
        }
        dispatch({type: ActionType.ChangeHydration, payload: hydration})
    }

    return (
        <Form.Group className={"col-sm-3 py-2"}>
            <Form.Label>Hydration (%)</Form.Label>
            <Form.Control type="text" value={state.hydration} onChange={handleHydrationChange}></Form.Control>
        </Form.Group>
    )
}

export default Hydration