import React from "react";
import { useNavigate } from "react-router";

import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";

import "./Groups.css";

export default function AddGroupItem() {
  const navigate = useNavigate();  

  const clickHandler = () => {
    navigate('/groups/add-group');
  };

  return (
    <div className="group-card" onClick={clickHandler}>
      <div className="group-image-container">
        <ControlPointRoundedIcon className="group-icon" />
      </div>
      <h2 className="add-group-title">Crear grupo</h2>
    </div>
  );
}
