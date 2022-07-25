import defaultValues from "./domain/defaultValues";
import React, {Dispatch, SetStateAction, useState} from "react";
//import {StoreContextInterface} from "./domain/interfaces";

type IHydration = [number, React.Dispatch<React.SetStateAction<number>>]
interface MyStore {
    hydration: IHydration
}

export const StoreContext = React.createContext({
} as MyStore)

const StoreContextProvider = ({ children }:{children: JSX.Element}) => {
    const [hydration, setHydration] = useState(0)

    const store = {
        hydration: [hydration, setHydration]
    } as MyStore

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreContextProvider