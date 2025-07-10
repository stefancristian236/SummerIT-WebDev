import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home";
import Calculator from "../components/calculator";
import Calculator2 from "../components/calculator_2";
export const Allroutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },{
        path: "/calculator",
        element: <Calculator />
    }, {
        path: "/calculator_2",
        element: <Calculator2 />
    }
]);