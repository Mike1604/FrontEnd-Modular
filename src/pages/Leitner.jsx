import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./Leitner.modules.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Leitner() {
  const navigate = useNavigate();

  return <div className={"main_container"}>
    <div className="top">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado</p>
      <div className="shortcuts">
        <button className="create_package">Crear paquete</button>
        <button className="create_new_auto_card">Crear carta automaticamente</button>
        <button className="create_new_auto_card">Crear carta manualmente</button>
        <MoreVertIcon fontSize="large"/>
      </div>
    </div>
    <div className="title">
      <h2>Revisa tus estadisticas semanales</h2>
      <div className="line"></div>
    </div>
    <section className="statistics">
      <div className="cardbox-big">
        <p>content</p>
      </div>
      <div className="cardbox">
        <p>content</p>
      </div>
      <div className="cardbox">
        <p>content</p>
      </div>
      <div className="cardbox">
        <p>content</p>
      </div>
    </section>
    <div className="title">
      <h2>Administra tus paquetes de cartas</h2>
      <div className="line"></div>
    </div>
    <section className="decks_container">
      <div className="deck" onClick={() => navigate('/study')}>
        <img src="./921441669733795_00001_.png" alt="" />
        <div className="deck_lower">
          <p>English 101</p>
          <SettingsIcon />
        </div>
      </div>
      <div className="deck">
        <img src="./962547412593675_00001_.png" alt="" />
        <div className="deck_lower">
          <p>English 101</p>
          <SettingsIcon />
        </div>
      </div>
      <div className="deck">
        <img src="./256228633657699_00001_.png" alt="" />
        <div className="deck_lower">
          <p>English 101</p>
          <SettingsIcon />
        </div>
      </div>
    </section>
  </div>
}
