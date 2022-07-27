import React, {useReducer} from "react";
import {AppContextInterface} from "../types/interfaces";
import reducer from "../reducers/reducer";
import defaultValues from "../config/defaultValues";

export const StoreContext = React.createContext<AppContextInterface>({state: defaultValues, dispatch: () => undefined} )

const StoreContextProvider = ({ children }:{children: JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, defaultValues)

    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export default StoreContextProvider