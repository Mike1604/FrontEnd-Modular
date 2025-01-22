import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from '@mui/icons-material/Menu';

import SearchBar from "../UI/SearchBar";
import NavBarStyles from "./NavBar.module.css";

import { toggleDarkMode } from "../../store/themeReducer";
import { getUserData } from "../../services/userService";

export default function NavBar({ gridClass, onToggleSideBar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const toggleTheme = () => dispatch(toggleDarkMode());

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const data = await getUserData(userId);
          setUserData(data);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleAvatarClick = () => {
    navigate(`/myaccount`);
  };

  return (
    <nav className={`${gridClass || ""}`}>
      <MenuIcon 
        className={"hamburger-menu-icon"} 
        onClick={onToggleSideBar} 
      />
      <div className={NavBarStyles["user-options"]}>
        <SearchBar className={NavBarStyles["searchBar"]} />
        <WbSunnyOutlinedIcon onClick={toggleTheme} />
        <NotificationsNoneIcon />
        <div
          className={NavBarStyles["avatar-cont"]}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        >
          {userData ? (
            <>
              <Avatar src={userData.profile_picture_path}>
                {`${userData.first_name?.[0]}${userData.last_name?.[0]}`}
              </Avatar>
              <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </nav>
  );
}
