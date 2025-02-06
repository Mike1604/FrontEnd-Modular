import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./GroupHome.css";

export default function AddGroupPost({ onAddPost, isLoading }) {
  const [postText, setPostText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postText.trim() === "") {
      alert("Ingresa el texto de tu anuncio")
      return;
    }

    onAddPost(postText);
    setPostText("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <TextField
        label="Escribe algo..."
        placeholder="Escribe algo..."
        variant="outlined"
        value={postText}
        name="group_description"
        onChange={(e) => setPostText(e.target.value)}
        fullWidth
        className="post-input"
        autoComplete="off"
      />
      <Button variant="outlined" type="submit" className="post-button" loading={isLoading}>
        Publicar
      </Button>
    </form>
  );
}
