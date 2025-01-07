import { useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Link } from "react-router";
import loginFormStyles from "../pages/Login.module.css";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import TextContainer from "../components/UI/TextContainer"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", { email, password });
  };

  return (
    <main className={loginFormStyles.formContainer}>
      <TextContainer text={'Iniciar sesión'}></TextContainer>

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
          <IconButton type="submit" /* className={loginFormStyles.icon} */>
            <ArrowCircleRightOutlinedIcon
              fontSize="large"
              className={loginFormStyles.icon}
            />
          </IconButton>
        </div>
      </form>

      <TextContainer text={'ó'}></TextContainer>

      <div className={loginFormStyles.submitContainer}>
        <Link to="/CreateAccount">
          <Button variant="text">
            <h2>Crear cuenta</h2>
          </Button>
        </Link>
      </div>
      <div className={loginFormStyles.submitContainer}>
        <Button variant="text" color="secondary">
          <h2>¿No recuerdas tu usuario o contraseña?</h2>
        </Button>
      </div>
      
    </main>
  );
}
