import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../auth/ProtectedRoute";
import LoginLayout from "../layouts/LoginLayout";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Account from "../pages/Account";
import SignUp from "../pages/Auth/SignUp";
import Groups from "../pages/Groups/Groups";
import GroupsSection from "../pages/Groups/GroupsSection";
import AddGroup from "../pages/Groups/AddGroup";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myaccount",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/groups",
        element: (
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "", 
            element: (
              <ProtectedRoute>
                <GroupsSection />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-group", 
            element: (
              <ProtectedRoute>
                <AddGroup />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/Login",
    element: <LoginLayout />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/SignUp",
    element: <LoginLayout />,
    children: [{ path: "", element: <SignUp /> }],
  },
]);

export default router;
