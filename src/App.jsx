import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./Util/MuiTheme";
import router from "./router/router"
import { setDarkMode } from "./store/themeReducer";
import "./App.css";


function App() {
  const dispatch = useDispatch(); 
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      dispatch(setDarkMode(savedDarkMode === "true"));
    } else {
      dispatch(setDarkMode(true));
    }
  }, [dispatch]);
  

  const theme = getTheme(darkMode);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--primary-color', theme.palette.primary.main);
    root.style.setProperty('--secondary-color', theme.palette.secondary.main);
    root.style.setProperty('--background-color', theme.palette.background.default);
    root.style.setProperty('--paper-color', theme.palette.background.paper);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
