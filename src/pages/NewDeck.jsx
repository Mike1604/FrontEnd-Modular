import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "./NewDeck.modules.css";
import {
  getUserData,
} from "../services/userService";

export default function NewDeck() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState(null)


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          setUserData(await getUserData(userId));
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const createDeck = () => {
    if (name == "") {
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        user_language: "Spanish",
        target_language: "English",
        description: description,
        owner: userData.id,
        private: false,
        cards: []
      })
    };


    fetch('http://127.0.0.1:8000/create-deck', requestOptions)
    navigate('/crear-carta')

  }


  return <div className={"main_container"}>
    <div className="breadcrumb">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado {">"} {" "}
        Crear nuevo paquete de cartas
      </p>
    </div>

    <div className="title">
      <h1>Crear un paquete</h1>
      <div className="line"></div>
    </div>

    <div className="form">
      <p>Dale un nombre a tu paquete de cartas</p>
      <input className="form_input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Frances para novatos" />
      <p>Describe tu paquete de cartas</p>
      <textarea className="form_text_area" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu nuevo paquete de cartas" />
      <div className="button_container">
        <button className="deck_button ok_button" onClick={createDeck}>Crear el paquete</button>
        <button className="deck_button cancel_button">Cancelar</button>
      </div>
    </div>
  </div>
}
