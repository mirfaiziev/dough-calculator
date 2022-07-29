import {Form} from "react-bootstrap";
import {ChangeEvent, useContext} from "react";
import {ActionType, AppContextInterface} from "../../types/interfaces";
import {StoreContext} from "../../contexts/StoreContextProvider";

const TotalDoughWeight = () => {
    const {state, dispatch} = useContext<AppContextInterface>(StoreContext)

    const handleTotalDoughWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
        let totalDoughWeight = 0
        if (event.target.value.length > 0 && Number.isInteger(+event.target.value)) {
            totalDoughWeight = parseInt(event.target.value)
        }
        dispatch({type: ActionType.ChangeTotalDoughWeight, payload: totalDoughWeight})
    }


    return (
        <Form.Group className={"col-sm-3  py-2"}>
            <Form.Label>Total Dough Weight  (grams) </Form.Label>
            <Form.Control type="text" value={state.totalDoughWeight} onChange={handleTotalDoughWeightChange}></Form.Control>
        </Form.Group>
    )
}

export default TotalDoughWeight