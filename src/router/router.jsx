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
import GroupDetail from "../pages/Groups/GroupDetail";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage"; // Página de error genérica
import Leitner from "../pages/Leitner";
import NewCard from "../pages/NewCard";
import NewDeck from "../pages/NewDeck";
import DeckView from "../pages/DeckView";
import Study from "../pages/Study";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />, // Página de error genérica
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
        path: "/leitner",
        element: (
          <ProtectedRoute>
            <Leitner />
          </ProtectedRoute>
        ),
      },{
        path: "/crear-carta",
        element: (
          <ProtectedRoute>
            <NewCard />
          </ProtectedRoute>
        ),
      },{
        path: "/crear-baraja",
        element: (
          <ProtectedRoute>
            <NewDeck />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-deck",
        element: (
          <ProtectedRoute>
            <DeckView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/study",
        element: (
          <ProtectedRoute>
            <Study />
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
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <GroupDetail />
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
  {
    path: "*",
    element: <NotFound />, // Página para rutas desconocidas
  },
]);

export default router;
