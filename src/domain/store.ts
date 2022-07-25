import {useState} from "react";
import defaultValues from "./defaultValues";

const store = () => {
    const [hydrationValue, setHydrationValue] = useState(defaultValues.hydration)

    return {
        hydration: [hydrationValue, setHydrationValue]
    }
}

export default store