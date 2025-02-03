import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import "./Leitner.modules.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SaveIcon from '@mui/icons-material/Save';
import ReactCardFlip from "react-card-flip";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export default function NewCard() {
  const [value, setValue] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showGenerate, setShowGenerate] = useState(true)
  const [imgUrl, setImgUrl] = useState("")
  const [card, setCard] = useState({})
  const [startDelay, setStartDelay] = useState(false);
  const audioRefs = useRef([]); // Array to hold refs for each audio element
  const [decks, setDecks] = useState([])
  const [saved, setSaved] = useState(false)
  const [isFlipped, setIsFlipped] = useState(true)

  const flipCard = () => {
    setIsFlipped(!isFlipped)
  }


  const setCardPreview = (data) => {
    setStartDelay(true)
    setCard(data)
    console.log(data)
  }

  useEffect(() => {
    if (startDelay) {
      const timer = setTimeout(() => {
        setImgUrl("./" + card.image)
        console.log(card)
        console.log(imgUrl)
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [startDelay]);

  const generateCard = () => {
    if (value == "") {
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: value,
        user_language: "Spanish",
        target_language: "English",
        style: "default",
        "Access-Control-Allow-Origin": "*"
      })
    };


    fetch('http://127.0.0.1:8000/generate', requestOptions)
      .then(response => response.json())
      .then(data => setCardPreview(data));
    setShowPreview(true)
    setShowGenerate(false)

    // Fetch decks for saving
    fetch('http://127.0.0.1:8000/decks')
      .then(response => response.json())
      .then(data => setDecks(data));
  }

  const saveCard = () => {
    return
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

  const playAudio = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].play(); // Play the audio corresponding to the index
    }
  };
  return <div className={"main_container"}>
    <div className="breadcrumb">
      <p>Inicio {">"} Leitner: Sistema de Aprendizaje Espaciado Automatizado {">"} {" "}
        Crear carta automaticamente
      </p>
    </div>

    <div className="card_generator">
      <h2>Quiero una carta de...</h2>
      <input className="card_input" placeholder="Manzana, pera..." value={value} onChange={(e) => setValue(e.target.value)} />
      {showGenerate ?
        <button onClick={generateCard} className="card_gen_button"><AutoAwesomeIcon />Generar</button>
        : <></>}
      {showPreview ?
        <div className="card_preview_container">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            <div className="card top-card-revealed">
              <h1 className="original_input">{card.original_input}<VolumeUpIcon /></h1>
              <h4 className="closest_translation">
                {card.closest_translations ? card.closest_translations.join(", ") : ""}
              </h4>
              <p className="description">
                {card.definition ? card.definition : ""}
              </p>

              <b className="uses">Ejemplos de uso</b>
              {card.examples ?
                card.examples.map((item, key) => (
                  <div className="example" key={key}>
                    <p>"{item}"</p>
                    <p><VolumeUpIcon onClick={() => playAudio(key)} /></p>
                    <audio ref={el => audioRefs.current[key] = el} src={card.examples_audio_path[key]} />
                  </div>
                ))
                : <></>}
              <ThreeSixtyIcon className="flipper" onClick={flipCard} fontSize="large" />
            </div>
            <div className="card top-card-unrevealed" onClick={flipCard}>
              <img src={imgUrl} alt={card.image_prompt} />
              <h2>{card.original_input}</h2>
            </div>
          </ReactCardFlip>

        </div>
        : <></>}
      {imgUrl != "" ?
        <div className="save_zone">

          {saved ? <h2>Guardado!</h2> : <h2>Guardar en...</h2>}

          {saved ? <></> : <div className="decks">
            {decks ? decks.map((deck, key) => (
              <div onClick={() => save_in_deck(deck, card.id)} className="save_deck" key={key}>{deck.name}</div>
            )) : <></>}
          </div>}
        </div>
        : <></>}
    </div>
  </div>
}
