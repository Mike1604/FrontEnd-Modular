import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import NavBarStyles from "./NavBar.module.css";
import Avatar from "@mui/material/Avatar";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/themeReducer";

const getUserData = async (userId, setUserData) => {
  try {
    const URL = `http://localhost:8001/users/${userId}`;
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    console.log("User data fetched: ", result);
    setUserData(result); // Actualiza el estado local con los datos del usuario
  } catch (error) {
    console.error("Error during fetching data", error);
  }
};

export default function NavBar({ gridClass }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const toggleTheme = () => dispatch(toggleDarkMode());

  const [userData, setUserData] = useState(null); // Estado local para los datos del usuario

  useEffect(() => {
    if (userId) {
      getUserData(userId, setUserData); // Llamada a la API solo cuando el componente se monta
    }
  }, []); // El arreglo vacío asegura que solo se ejecute una vez, en el primer renderizado

  return (
    <nav className={`${gridClass || ""}`}>
      <SearchBar className={NavBarStyles["searchBar"]}></SearchBar>
      <div className={NavBarStyles["user-options"]}>
        <WbSunnyOutlinedIcon onClick={toggleTheme} />
        <NotificationsNoneIcon />
        <div className={NavBarStyles["avatar-cont"]}>
          {userData ? (
            <>
              <Avatar>{`${userData.first_name?.[0]}${userData.last_name?.[0]}`}</Avatar>{" "}
              <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </nav>
  );
}
