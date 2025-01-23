import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
    createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: darkMode ? "#3f8985" : "#31706e",
            },
            secondary: {
                main: darkMode ? "#f4f9f8" : "#102223",
            },
            third: {
                main: darkMode ? "#bebebe" : "#31706e",
            },
            background: {
                default: darkMode ? "#121212" : "#F5F5F5",
                secondary: darkMode ? "#252525" : "#E0E0E0",
                paper: darkMode ? "#5aa7a1" : "#ffffff",
            },
            shadow: {
                secondary: darkMode ? "#000000" : "#bebebe",
            }
        },
    });
