import SearchBar from "./SearchBar";
import NavBarStyles from "./NavBar.module.css";
import Avatar from "@mui/material/Avatar";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function NavBar({ gridClass }) {
  return (
    <nav className={`${gridClass || ""}`}>
      <SearchBar className={NavBarStyles["searchBar"]}></SearchBar>
      <div className={NavBarStyles["user-options"]}>
        <WbSunnyOutlinedIcon />
        <NotificationsNoneIcon />
        <div className={NavBarStyles["avatar-cont"]}>
          <Avatar>AF</Avatar>
          <h2>Abraham Flores</h2>
        </div>
      </div>
    </nav>
  );
}
