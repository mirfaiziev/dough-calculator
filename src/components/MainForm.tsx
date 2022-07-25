import {Form} from "react-bootstrap";
import Hydration from "./MainForm/Hydration";
import FlourWeight from "./MainForm/FlourWeight";
import WaterWeight from "./MainForm/WaterWeight";
import TotalDoughWeight from "./MainForm/TotalDoughWeight";

const MainForm = () => {
    return (
        <Form className={"py-4 "}>
            <Hydration></Hydration>
            <FlourWeight></FlourWeight>
            <WaterWeight></WaterWeight>
            <TotalDoughWeight></TotalDoughWeight>
        </Form>
    )
}

export default MainForm