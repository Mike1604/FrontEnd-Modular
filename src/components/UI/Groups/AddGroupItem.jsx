import React from "react";
import { useNavigate } from "react-router";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

import "../../../pages/Groups/Groups.css";

export default function AddGroupItem() {
  const navigate = useNavigate();  

  const clickHandler = () => {
    navigate('/groups/add-group');
  };

  return (
    <div className="add-group-card" onClick={clickHandler}>
      <div className="icon-container">
        <ControlPointRoundedIcon className="add-icon" />
      </div>
      <h2 className="add-group-title">Crear grupo</h2>
    </div>
  );
}
