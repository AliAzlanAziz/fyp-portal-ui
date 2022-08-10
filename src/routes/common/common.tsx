import { useRoutes } from "react-router-dom";
import Basic from "../../components";

export const HomeRoutes = () => useRoutes([
    { path: "/", element: <Basic.Home /> },
    { path: "/home", element: <Basic.Home /> },
]);
