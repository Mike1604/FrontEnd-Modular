import { useState, useEffect, useRef } from "react";
import "./Leitner.modules.css";
import Card from "../components/UI/Card";

// Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';

export default function NewCard() {
  const [inputValue, setInputValue] = useState("")
  const [visibleCard, setVisibleCard] = useState(false)
  const [visibleGenerateButton, setVisibleGenerateButton] = useState(true)
  const [card, setCard] = useState({})
  const [decks, setDecks] = useState([])
  const [saved, setSaved] = useState(false)

  const generateCard = () => {
    // Validation for input
    if (inputValue == "") {
      // TODO: Actually indicate to the user that the input is not valid
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: inputValue,
        user_language: "Spanish",
        target_language: "English",
        style: "default"
      })
    };

    fetch('http://127.0.0.1:8000/generate', requestOptions)
      .then(response => response.json())
      .then(data => setCard(data));

    setVisibleCard(true)
    setVisibleGenerateButton(false)

    // Fetch decks for saving
    fetch('http://127.0.0.1:8000/decks')
      .then(response => response.json())
      .then(data => setDecks(data));
  }

  const save_in_deck = (deck, card_id) => {
    console.log(deck)
    console.log(card_id)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deck_name: deck.name,
        deck_owner: deck.owner,
        card_id: card_id,
        "Access-Control-Allow-Origin": "*"
      })
    };


    fetch('http://127.0.0.1:8000/save', requestOptions)
      .then(response => response.json())
      .then(data => setSaved(true));
  }

  return <div className={"main_container"}>
    <div className="breadcrumb">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado {">"} {" "}
        Crear carta automaticamente
      </p>
    </div>

    <div className="card_generator">
      <h2>Quiero una carta de...</h2>
      <input className="card_input" placeholder="Manzana, pera..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      {visibleGenerateButton ?
        <button onClick={generateCard} className="card_gen_button"><AutoAwesomeIcon />Generar</button>
        : null
      }

      { visibleCard ?
        <div className="card_preview_container">
          <Card data={card} />
        </div>
        : null
      }

      {/* Discard or save card */}
      
      {card.image ?
        <div className="save_zone">
          <DeleteOutlineIcon className="discard" fontSize="inherit"/>
          <SaveIcon className="save" fontSize="inherit"/>
          {/* {saved ? <></> : <div className="decks">
            {decks ? decks.map((deck, key) => (
              <div onClick={() => save_in_deck(deck, card.id)} className="save_deck" key={key}>{deck.name}</div>
            )) : <></>}
          </div>} */}
        </div>
        : <></>}
    </div>
  </div>
}
