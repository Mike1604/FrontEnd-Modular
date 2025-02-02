import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";

import { getGroup } from "../../services/groupsSevice";
import "./GroupDetail.css";
import GroupConfig from "./GroupConfig/GroupConfig";
import GroupMembers from "./GroupMembers/GroupMembers";

const GROUP_OPTIONS = {
  INICIO: "Inicio",
  MIEMBROS: "Miembros",
  CONFIGURACION: "Configuración",
};

export default function GroupDetail() {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  
  const [group, setGroup] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [section, setSection] = useState(GROUP_OPTIONS.INICIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await getGroup(id);
        setGroup(data);
        setIsOwner(data.owner === userId);
      } catch (err) {
        setError("Error cargando el grupo.");
        console.error("Error fetching group details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id, userId]);

  if (loading) {
    return (
      <div className="loading-cont">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="group-section">
      <Header group={group} />
      <Navbar section={section} setSection={setSection} isOwner={isOwner} />
      <Content section={section} group={group} isOwner={isOwner} />
    </div>
  );
}

const Header = ({ group }) => (
  <div className="title-section">
    <h1 className="group-detail-title">{group.group_name}</h1>
    <div className="code-section">
      <p>Código:</p>
      <h2>19302</h2>
    </div>
  </div>
);

const Navbar = ({ section, setSection, isOwner }) => {
  const options = isOwner
    ? Object.values(GROUP_OPTIONS)
    : Object.values(GROUP_OPTIONS).filter((opt) => opt !== GROUP_OPTIONS.CONFIGURACION);

  return (
    <nav className="group-navbar">
      <ul>
        {options.map((option) => (
          <li key={option}>
            <button
              className={`navbar-button ${section === option ? "active" : ""}`}
              onClick={() => setSection(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Content = ({ section, group, isOwner }) => {
  switch (section) {
    case GROUP_OPTIONS.INICIO:
      return <p>{group.group_description}</p>;
    case GROUP_OPTIONS.MIEMBROS:
      return <GroupMembers group={group} isOwner={isOwner}/>;
    case GROUP_OPTIONS.CONFIGURACION:
      return isOwner ? <GroupConfig group={group} /> : <p>No tienes acceso a esta sección.</p>;
    default:
      return <p>Sección no encontrada</p>;
  }
};
