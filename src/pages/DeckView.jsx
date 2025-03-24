import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocation } from "react-router";


import "./NewDeck.modules.css";
import Deck from "../components/UI/Deck";
import {
  getUserData,
} from "../services/userService";

import "./DeckView.modules.css";

export default function DeckView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const userId = useSelector((state) => state.auth.userId);
  const [userData, setUserData] = useState(null)
  const [cards, setCards] = useState(null)

  useEffect(() => {
    const fetchCards = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deck_name: location.state.name,
          deck_owner: location.state.owner
        })
      };

      fetch('http://127.0.0.1:8000/fetch-all-cards', requestOptions)
        .then(response => response.json())
        .then(data => {
          setCards(data);
          setName(location.state.name)
          setDescription("Paquete de cartas en Inglés, para todos los niveles.") // Temporal
          console.log(data)
        });
    }

    fetchCards();
  }, []);

  const updateDeck = () => {
    // if (name == "") {
    //   return
    // }

    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: name,
    //     user_language: "Spanish",
    //     target_language: "English",
    //     description: description,
    //     owner: userData.id,
    //     private: false,
    //     cards: []
    //   })
    // };


    // fetch('http://127.0.0.1:8000/create-deck', requestOptions)
    // navigate('/crear-carta')

  }

  return <div className={"main_container"}>
    <div className="breadcrumb">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado {">"} {" "}
        Configurar mazo
      </p>
    </div>
    <div className="title">
      <h1>{location.state.name} ({cards ? cards.length : "?"} cartas)</h1>
      <div className="line" style={{ marginLeft: '20px' }}></div>
    </div>
    <div className="first_division">
      <div className="left">
        <div className="deck" style={{height: "500px"}}>
          <img src={"./" + (cards ? cards[0].image : "")}/>
        </div>
      </div>
      <div className="middle">
        <div className="form">
          <p style={{ fontSize: "1.5em" }}>Nombre del mazo</p>
          <input className="form_input" style={{ fontSize: "1.2em", minWidth: "700px" }} value={name} onChange={(e) => setName(e.target.value)}  />
          <p style={{ fontSize: "1.5em" }}>Descripción del mazo</p>
          <textarea className="form_text_area" style={{ fontSize: "1.1em", minWidth: "700px", minHeight: "300px" }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu nuevo paquete de cartas" />
          <div className="button_container">
            <button style={{ fontSize: "1.2em", width: "300px", backgroundColor: "#E8C609", color: "black", fontWeight: "Bold" }} className="deck_button" onClick={updateDeck}>Actualizar informacion</button>
          </div>
        </div>
        <div className="right">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'Memorizadas' },
                  { id: 1, value: 15, label: 'Aprendiendo' },
                  { id: 2, value: 20, label: 'Olvidadas' },
                  { id: 3, value: 2, label: 'Nuevas' },
                ],
              },
            ]}
            width={650}
            height={350}
          />
        </div>
      </div>

    </div>

    <div>
      <div className="line" style={{ width: "98.5%", marginTop: "50px", marginBottom: "30px" }}></div>
    </div>
    <section className="decks_container">
      {cards ? cards.map((card, key) => (
        <div className="deck" key={key}>
          <img src={"./" + card.image} />
          <div className="deck_lower">
            <p>{card.original_input}</p>
          </div>
        </div>
      )) : null}
    </section>

  </div>
}
