import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../auth/ProtectedRoute";
import LoginLayout from "../layouts/LoginLayout";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home"
import Login from "../pages/login";
import Account from "../pages/Account";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>, 
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <ProtectedRoute><Home /></ProtectedRoute> }, 
      { path: "/myaccount", element: <ProtectedRoute><Account/></ProtectedRoute>}
    ],
  },
  {
    path: "/Login",
    element: <LoginLayout />, 
    children: [
      { path: "", element: <Login /> }, 
    ],
  },
  {
    path: "/SignUp",
    element: <LoginLayout />, 
    children: [
      { path: "", element: <SignUp /> }, 
    ],
  },
]);

export default router;
