import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./GroupHome.css";

export default function AddGroupPost({ onAddPost }) {
  const [postText, setPostText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() === "") return; // Evita agregar posts vacíos

    onAddPost(postText); // Agrega el post a la lista
    setPostText(""); // Limpia el campo después de enviar
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <TextField
        label="Escribe algo..."
        multiline
        rows={2}
        placeholder="Escribe algo..."
        variant="outlined"
        value={postText}
        name="group_description"
        onChange={(e) => setPostText(e.target.value)}
        fullWidth
      />
      <Button variant="outlined" type="submit" className="post-button">
        Publicar
      </Button>
    </form>
  );
}
