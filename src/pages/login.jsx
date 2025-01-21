import { useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Link } from "react-router";
import loginFormStyles from "../pages/Login.module.css";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import TextContainer from "../components/UI/TextContainer";
import PasswordField from "../components/UI/PasswordField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      email,
      password,
    };

    console.log("User to send", dataToSend);

    try {
      const response = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Inicio de sesion correctamente:", result);
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
  };

  return (
    <main>
      <TextContainer text={"Iniciar sesión"}></TextContainer>

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
        <PasswordField label={"Contraseña"} value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className={loginFormStyles.submitContainer}>
          <IconButton type="submit">
            <ArrowCircleRightOutlinedIcon
              fontSize="large"
              className={loginFormStyles.icon}
            />
          </IconButton>
        </div>
      </form>

      <TextContainer text={"ó"}></TextContainer>

      <div className={loginFormStyles.submitContainer}>
        <Link to="/SignUp">
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
