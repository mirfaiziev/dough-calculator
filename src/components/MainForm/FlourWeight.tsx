import {Form} from "react-bootstrap";
import {ChangeEvent, useContext} from "react";
import {ActionType, AppContextInterface} from "../../types/interfaces";
import {StoreContext} from "../../contexts/StoreContextProvider";

const FlourWeight = () => {
    const {state, dispatch} = useContext<AppContextInterface>(StoreContext)

    const handleFlourWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        let flourWeight = 0
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            flourWeight = parseInt(event.target.value)
        }
        dispatch({type: ActionType.ChangeFlourWeight, payload: flourWeight})
    }

    return (
        <Form.Group className={"col-sm-3  py-2"}>
            <Form.Label>Flour Weight (grams) </Form.Label>
            <Form.Control type="text" value={state.flourWeight} onChange={handleFlourWeightChange}></Form.Control>
        </Form.Group>
    )
}

export default FlourWeight