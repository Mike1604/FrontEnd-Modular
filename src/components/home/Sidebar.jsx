import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import sidebarStyles from "./Sidebar.module.css";
import GlotoolsHeader from "../login/GloToolsHeader";

export default function Sidebar({ gridClass }) {
  const navigate = useNavigate();


  const handleLogout = () => {
    navigate(`/login`);
  };

  return (
    <aside className={`${sidebarStyles["side-container"]} ${gridClass || ""}`}>
      <GlotoolsHeader
        className={sidebarStyles["header-title"]}
      ></GlotoolsHeader>
      <div className={`${sidebarStyles["sidebar-section"]}`}>
        <h2>Yo</h2>
      </div>
      <div className={sidebarStyles.logout}>
        <Button variant="outlined" onClick={handleLogout}>Cerrar sesion</Button>
      </div>
    </aside>
  );
}
