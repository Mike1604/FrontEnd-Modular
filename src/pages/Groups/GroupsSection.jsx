import { useOutletContext, Link } from "react-router";

import QueueIcon from "@mui/icons-material/Queue";

import AddGroupItem from "./AddGroupItem";
import GroupItem from "./GroupItem";

export default function GroupsSection() {
  const { groups } = useOutletContext();

  return (
    <div className="groups-page">
      <Link to={"/groups"}>
        <h2 className="title-right-line">Mis grupos</h2>
      </Link>
      <div className="group-options-cont">
        <div className="group-option">
          <h3>Unirme a un grupo</h3>
          <QueueIcon />
        </div>
      </div>

      <div className="groups-content">
        <AddGroupItem />
        {groups && groups.length > 0 ? (
          groups.map((group, index) => <GroupItem key={index} group={group} />)
        ) : (
          <h3 key="no-groups">No hay grupos disponibles.</h3>
        )}
      </div>
    </div>
  );
}
