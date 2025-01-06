import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./Util/MuiTheme";
/* import Button from "@mui/material/Button"; */
import Login from "./pages/Login";
import "./App.css";

const router = createBrowserRouter([{ path: "/", element: <Login /> }]);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = getTheme(darkMode);

  /* const toggleDarkMode = () => setDarkMode(!darkMode); */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <div style={{ textAlign: "center", padding: "1rem" }}>
        <Button variant="contained" onClick={toggleDarkMode}>
          Cambiar a {darkMode ? "Claro" : "Oscuro"}
        </Button>
      </div> */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
