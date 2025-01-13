import SidebarStyles from "./Sidebar.module.css";
import GlotoolsHeader from "../login/GloToolsHeader";

export default function Sidebar() {
  return (
    <aside className={SidebarStyles["sidebar-section"]}>
      <GlotoolsHeader className={SidebarStyles['header-title']}></GlotoolsHeader>
      <h2>Yo</h2>
    </aside>
  );
}


