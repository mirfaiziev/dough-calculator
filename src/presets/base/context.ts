import React from "react";
import { AppContextInterface } from "./types";
import defaults from "./defaults";

export const StoreContext = React.createContext<AppContextInterface>({
    state: defaults,
    dispatch: () => undefined,
});
