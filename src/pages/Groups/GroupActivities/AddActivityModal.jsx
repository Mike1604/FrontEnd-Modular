import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Search, Save, Add } from "@mui/icons-material";
import { useSelector } from "react-redux";


const activityTypes = ["Leitner Clasico", "Examen"];
const evaluationTypes = ["Leitner", "Basada en texto"];

const dummyDecks = [
  {
    id: 1,
    name: "Deck 1",
    image:
      "https://istscientific.com/wp-content/uploads/2023/10/Top-7-Lab-Supplies-Every-Laboratory-Needs.jpg",
  },
  {
    id: 2,
    name: "Deck 2",
    image:
      "https://istscientific.com/wp-content/uploads/2023/10/Top-7-Lab-Supplies-Every-Laboratory-Needs.jpg",
  },
  {
    id: 3,
    name: "Deck 3",
    image:
      "https://istscientific.com/wp-content/uploads/2023/10/Top-7-Lab-Supplies-Every-Laboratory-Needs.jpg",
  },
  {
    id: 4,
    name: "Deck 4",
    image:
      "https://istscientific.com/wp-content/uploads/2023/10/Top-7-Lab-Supplies-Every-Laboratory-Needs.jpg",
  },
  {
    id: 5,
    name: "Deck 5",
    image:
      "https://istscientific.com/wp-content/uploads/2023/10/Top-7-Lab-Supplies-Every-Laboratory-Needs.jpg",
  },
];

export default function AddActivityModal({ handleClose, handleSave }) {
  const userId = useSelector((state) => state.auth.userId);
  const [decks, setDecks] = useState([])
  const [filteredDecks, setFilteredDecks] = useState([]);

  useEffect(() => {
    if (userId) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner: userId
        }
        )
      };
      fetch('http://127.0.0.1:8000/decks', requestOptions)
        .then(response => response.json())
        .then(data => setDecks(data));
    }
  }, [userId])

  const [activityData, setActivityData] = useState({
    title: "",
    description: "",
    type: "",
    evaluation: "",
    deckSearch: "",
    deck: "",
    deckOwner: userId
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSelectDeck = (deckName) => {
    setActivityData((prevData) => ({
      ...prevData,
      ["deck"]: deckName
    }));
  };

  useEffect(() => {
    const searchQuery = activityData.deckSearch.toLowerCase();
    const filtered = decks.filter((deck) =>
      deck.name.toLowerCase().includes(searchQuery)
    );
    setFilteredDecks(filtered);
  }, [activityData.deckSearch]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const handleOnSave = (e) => {
    handleSave(activityData);
    handleClose()
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="add-act-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="main-title">Actividad de grupo</h2>
        <TextField
          name="title"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Titulo"
          value={activityData.title}
          onChange={handleChange}
          autoComplete="off"
        />

        <TextField
          name="description"
          variant="outlined"
          margin="normal"
          fullWidth
          label="Descripcion"
          value={activityData.description}
          onChange={handleChange}
          multiline
          rows={2}
        />

        <div className="combo-box-container">
          <FormControl required fullWidth>
            <InputLabel id="type-label">Tipo de Actividad</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={activityData.type}
              onChange={handleChange}
            >
              {activityTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required>
            <InputLabel id="evaluation-label">Evaluación</InputLabel>
            <Select
              labelId="evaluation-label"
              id="evaluation"
              name="evaluation"
              value={activityData.evaluation}
              onChange={handleChange}
              displayEmpty
            >
              {evaluationTypes.map((evaluation, index) => (
                <MenuItem key={index} value={evaluation}>
                  {evaluation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <TextField
          autoComplete="off"
          name="deckSearch"
          variant="outlined"
          margin="normal"
          fullWidth
          label="Buscar Deck"
          value={activityData.deckSearch}
          onChange={handleChange}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="act-decks-cont">
          <div className="act-deck-container">
            <div className="act-deck-card">
              <Add />
            </div>
            <h2>Create deck</h2>
          </div>

          {filteredDecks.length === 0 ? (
            decks ? decks.map((deck, key) => (
              <div
                key={key}
                className="act-deck-container"
                onClick={() => onSelectDeck(deck.name)}
              >
                <div
                  className={`${activityData.deck == deck.name ? "active-deck" : ""
                    } act-deck-card`}
                >
                  <img src={"../" + deck.image} alt={deck.name} />
                </div>
                <h2>{deck.name}</h2>
              </div>
            )) : "Buscando mazos..."
          ) : (
            filteredDecks.map((deck, key) => (
              <div
                key={key}
                className="act-deck-container"
                onClick={() => onSelectDeck(deck.name)}
              >
                <div
                  className={`${activityData.deck == deck.name ? "active-deck" : ""
                    } act-deck-card`}
                >
                  <img src={"../" + deck.image} alt={deck.name} />
                </div>
                <h2>{deck.name}</h2>
              </div>
            ))
          )}
        </div>

        <Button variant="outlined" endIcon={<Save />} onClick={handleOnSave}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
