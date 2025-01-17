import SidebarStyles from "./Sidebar.module.css";
import GlotoolsHeader from "../login/GloToolsHeader";


export default function Sidebar({gridClass}) {
  return (
    <aside className={`${SidebarStyles['sidebar-section']} ${gridClass || ''}`}>
      <GlotoolsHeader className={SidebarStyles['header-title']}></GlotoolsHeader>
      <h2>Yo</h2>
    </aside>
  );
}


