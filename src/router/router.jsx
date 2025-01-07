import { createBrowserRouter } from "react-router";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout/>,
    children: [
      { path: "/", element: <Login /> },
      { path: "/CreateAccount", element: <CreateAccount /> },
    ],
  },
]);

export default router;
