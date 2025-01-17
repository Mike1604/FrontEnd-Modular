import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./Util/MuiTheme";
import Button from "@mui/material/Button";
import router from "./router/router"
import "./App.css";


function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = getTheme(darkMode);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--primary-color', theme.palette.primary.main);
    root.style.setProperty('--secondary-color', theme.palette.secondary.main);
    root.style.setProperty('--background-color', theme.palette.background.default);
    root.style.setProperty('--paper-color', theme.palette.background.paper);
  }, [theme]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ textAlign: "center", padding: "1rem" }}>
        <Button variant="contained" onClick={toggleDarkMode}>
          Cambiar a {darkMode ? "Claro" : "Oscuro"}
        </Button>
      </div>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
