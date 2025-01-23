import { useOutletContext } from "react-router";

import QueueIcon from "@mui/icons-material/Queue";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import AddGroupItem from "../../components/UI/Groups/AddGroupItem";

export default function GroupsSection() {
  const { groups } = useOutletContext();

  return (
    <section>
      <div className="group-options-cont">
        <div className="group-option">
          <h3>Editar grupos</h3>
          <ModeEditOutlinedIcon />
        </div>
        <div className="group-option">
          <h3>Unirme a un grupo</h3>
          <QueueIcon />
        </div>
      </div>

      <div className="groups-content">
        <AddGroupItem />
        {groups && groups.length > 0 ? (
          groups.map((group, index) => <p key={index}>{group.group_name}</p>)
        ) : (
          <p key="no-groups">No hay grupos disponibles.</p>
        )}
      </div>
    </section>
  );
}
