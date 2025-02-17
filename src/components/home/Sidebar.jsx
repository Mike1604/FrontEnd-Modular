import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import HomeIcon from "@mui/icons-material/Home";

import sidebarStyles from "./Sidebar.module.css";
import GlotoolsHeader from "../login/GloToolsHeader";
import SideBarSection from "../UI/SideBarSection";
import { logout } from "../../store/authReducer";

export default function Sidebar({ gridClass, activeClass }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  
  const handleLogout = () => {
    dispatch(logout());
    navigate(`/login`);
  };

  return (
    <aside
      className={`${sidebarStyles["side-container"]} ${gridClass || ""} ${
        activeClass || ""
      }`}
    >
      <GlotoolsHeader
        className={sidebarStyles["header-title"]}
      ></GlotoolsHeader>
      <div className={`${sidebarStyles["sidebar-section"]}`}>
        <SideBarSection
          title="Administración"
          icon={HomeIcon}
          options={[
            { title: "Mi cuenta", route: "/myaccount" },
            { title: "Grupos", route: "/groups" },
          ]}
        />
      </div>
      <div className={sidebarStyles.logout}>
        <Button variant="outlined" onClick={handleLogout}>
          Cerrar sesion
        </Button>
      </div>
    </aside>
  );
}
