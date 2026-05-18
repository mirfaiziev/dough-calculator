import React from "react";
import { NeapolitanContextInterface } from "./types";
import defaults from "./defaults";
import { derive } from "./calc";

export const NeapolitanContext = React.createContext<NeapolitanContextInterface>({
    view: { ...defaults, ...derive(defaults) },
    dispatch: () => undefined,
});
