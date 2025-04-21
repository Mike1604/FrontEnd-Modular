import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { Save } from "@mui/icons-material";

import "./InfoActivityModal.css";

const activityTypes = ["Leitner Clasico", "Examen"];
const evaluationTypes = ["Leitner", "Basada en texto"];

export default function InfoActivityModal({
  mode,
  handleClose,
  activity,
  handleSave,
}) {
  const [activityData, setActivityData] = useState({
    title: activity.title,
    description: activity.description,
    type: activity.type,
    evaluation: activity.evaluation,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  const editDisabled = mode != "edit";

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="edit-act-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="main-title">Editar Actividad</h2>

        <TextField
          name="title"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Título"
          value={activityData.title}
          onChange={handleChange}
          disabled={editDisabled}
        />

        <TextField
          name="description"
          variant="outlined"
          margin="normal"
          fullWidth
          label="Descripción"
          value={activityData.description}
          onChange={handleChange}
          multiline
          rows={2}
          disabled={editDisabled}
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
              disabled={editDisabled}
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
              disabled={editDisabled}
            >
              {evaluationTypes.map((evaluation, index) => (
                <MenuItem key={index} value={evaluation}>
                  {evaluation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="deck-info">
          <p className="deck-label">Deck seleccionado:</p>
          <p className="deck-name">{activity.deck}</p>
          {editDisabled == false && (
            <p className="deck-warning">
              ⚠️ No es posible cambiar el deck en una actividad ya creada. Si
              necesitas usar otro deck, crea una nueva actividad.
            </p>
          )}
        </div>

        {editDisabled == false && (
          <Button
            variant="outlined"
            endIcon={<Save />}
            onClick={() => handleSave(activity.id, activityData)}
          >
            Guardar Cambios
          </Button>
        )}
      </div>
    </div>
  );
}
