import React from "react";

export interface HydrationStateInterface {
    hydration: number,
    setHydration:  React.Dispatch<React.SetStateAction<number>>
}
export interface StoreContextInterface {
    hydration: HydrationStateInterface
}

