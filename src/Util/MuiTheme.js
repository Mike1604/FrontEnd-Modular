import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
    createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: darkMode ? "#3f8985" : "#F5F5F5",
            },
            background: {
                default: darkMode ? "#121212" : "#F5F5F5",
                paper: darkMode ? "#5aa7a1" : "#ffffff",
            },
        },
    });
