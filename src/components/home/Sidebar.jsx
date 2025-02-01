import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import HomeIcon from "@mui/icons-material/Home";

import sidebarStyles from "./Sidebar.module.css";
import GlotoolsHeader from "../login/GloToolsHeader";
import SideBarSection from "../UI/SideBarSection";
import { PlayCircle } from "@mui/icons-material";

export default function Sidebar({ gridClass, activeClass }) {
  const navigate = useNavigate();  
  
  const handleLogout = () => {
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
      <div className={`${sidebarStyles["sidebar-section"]}`}>
        <SideBarSection
          title="Leitner"
          icon={PlayCircle}
          options={[
            { title: "Inicio", route: "/leitner" },
            { title: "Sesion rapida", route: "/leitner" },
            { title: "Crear carta automaticamente", route: "/crear-carta" },
            { title: "Crear nueva baraja", route: "/crear-baraja" },
            { title: "Configurar", route: "/leitner" },
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
