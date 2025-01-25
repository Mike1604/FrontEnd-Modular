import React from "react";
import { useNavigate } from "react-router";

import GroupsIcon from "@mui/icons-material/Groups";

export default function GroupItem({ group }) {
  const navigate = useNavigate();

    const handleClick = (e) => {
        navigate(`/groups/${group.id}`)
        
    }

  return (
    <div className="group-card" onClick={handleClick}>
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
    </div>
  );
}
