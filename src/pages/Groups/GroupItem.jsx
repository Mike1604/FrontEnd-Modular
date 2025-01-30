import React from "react";
import { Link } from "react-router";
import GroupsIcon from "@mui/icons-material/Groups";

export default function GroupItem({ group }) {
  return (
    <Link to={`/groups/${group.id}`} className="group-card">
      <div className="group-image-container">
        {group.group_picture_path ? (
          <img
            src={group.group_picture_path}
            alt={group.group_name}
            className="group-image"
          />
        ) : (
          <GroupsIcon className="group-icon" />
        )}
      </div>
      <h3 className="group-name">{group.group_name}</h3>
    </Link>
  );
}
