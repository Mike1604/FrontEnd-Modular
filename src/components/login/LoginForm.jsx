import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import loginFormStyles from "./LoginForm.module.css";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", { email, password });
  };

  return (
    <main className={loginFormStyles.formContainer}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={loginFormStyles.submitContainer}>
          <IconButton type="submit">
            <ArrowCircleRightOutlinedIcon fontSize="large" className={loginFormStyles.icon} />
          </IconButton>
        </div>
      </form>
    </main>
  );
}
