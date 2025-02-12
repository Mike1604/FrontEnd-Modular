import { useState, useEffect, useRef } from "react";
import "./Leitner.modules.css";
import Card from "../components/UI/Card";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

// Icons
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';

// Style for Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-15%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  outline: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function NewCard() {
  const [inputValue, setInputValue] = useState("")
  const [visibleCard, setVisibleCard] = useState(false)
  const [visibleGenerateButton, setVisibleGenerateButton] = useState(true)
  const [card, setCard] = useState({})
  const [decks, setDecks] = useState([])
  const [saved, setSaved] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
        text: inputValue.trim(),
        // Next fields should be acquired from user settings
        user_language: "Spanish",
        target_language: "English",
        owner: "Randy",
        style: "default" 
      })
    };

    fetch('http://127.0.0.1:8000/generate', requestOptions)
      .then(response => response.json())
      .then(data => setCard(data));

    setVisibleCard(true)
    setVisibleGenerateButton(false)

    // If we already fetched the decks, no need
    if (!decks.length) {
      // Fetch decks for saving
      fetch('http://127.0.0.1:8000/decks')
        .then(response => response.json())
        .then(data => setDecks(data));
    }
  }

  const save_in_deck = (deck, card_id) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deck_name: deck.name,
        deck_owner: deck.owner,
        card_id: card_id
      })
    };


    fetch('http://127.0.0.1:8000/save', requestOptions)
      .then(response => response.json())
      .then(data => setSaved(true));
  }

  const clean = () => {
    setInputValue("")
    setCard({})
    setVisibleGenerateButton(true)
    setVisibleCard(false)
    setSaved(false)
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

      {visibleCard ?
        <div className="card_preview_container">
          <Card data={card} />
        </div>
        : null
      }

      {/* Discard or save card */}

      {card.image ?
        <div className="save_zone">
          <DeleteOutlineIcon onClick={clean} className="discard" fontSize="inherit" />
          <SaveIcon onClick={handleOpen} className="save" fontSize="inherit" />

        </div>
        : <></>}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Guardar en mazo...
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="decks">
              {decks ? decks.map((deck, key) => (
                <div onClick={() => {
                  save_in_deck(deck, card.id)
                  handleClose()
                  clean()
                }} className="save_deck" key={key}>{deck.name}</div>
              )) : <></>}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  </div>
}
