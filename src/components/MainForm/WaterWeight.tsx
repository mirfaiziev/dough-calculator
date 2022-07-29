import {Form} from "react-bootstrap";
import {ChangeEvent, useContext} from "react";
import {ActionType, AppContextInterface} from "../../types/interfaces";
import {StoreContext} from "../../contexts/StoreContextProvider";

const WaterWeight = () => {
    const {state, dispatch} = useContext<AppContextInterface>(StoreContext)

    const handleFlourWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        let waterWeight = 0
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            waterWeight = parseInt(event.target.value)
        }
        dispatch({type: ActionType.ChangeWaterWeight, payload: waterWeight})
    }


    return (
        <Form.Group className={"col-sm-3  py-2"}>
            <Form.Label>Water Weight  (grams) </Form.Label>
            <Form.Control type="text" value={state.waterWeight} onChange={handleFlourWeightChange}></Form.Control>
        </Form.Group>
    )
}

export default WaterWeight