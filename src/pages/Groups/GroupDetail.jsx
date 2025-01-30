import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";

import { getGroup } from "../../services/groupsSevice";
import "./GroupDetail.css";
import GroupConfig from "./GroupConfig/GroupConfig";

const GROUP_OPTIONS = {
  INICIO: "Inicio",
  MIEMBROS: "Miembros",
  CONFIGURACION: "Configuración",
};

export default function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [section, setSection] = useState(GROUP_OPTIONS.INICIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await getGroup(id);
        setGroup(data);
      } catch (err) {
        setError("Error cargando el grupo.");
        console.error("Error fetching group details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

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
      <Navbar section={section} setSection={setSection} />
      <Content section={section} group={group} />
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

const Navbar = ({ section, setSection }) => (
  <nav className="group-navbar">
    <ul>
      {Object.values(GROUP_OPTIONS).map((option) => (
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

const Content = ({ section, group }) => {
  switch (section) {
    case GROUP_OPTIONS.INICIO:
      return <p>{group.group_description}</p>;
    case GROUP_OPTIONS.MIEMBROS:
      return <p>Lista de miembros próximamente...</p>;
    case GROUP_OPTIONS.CONFIGURACION:
      return <GroupConfig group={group} />;
    default:
      return <p>Sección no encontrada</p>;
  }
};
