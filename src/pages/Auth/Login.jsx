import { useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import loginFormStyles from "../Auth/Login.module.css";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import TextWithLinesContainer from "../../components/UI/TextWithLinesContainer";
import PasswordField from "../../components/UI/PasswordField";

import { login } from "../../store/authReducer";
import { loginRequest } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("username", email);
    dataToSend.append("password", password);

    console.log("User to send", dataToSend);

    const result = await loginRequest(dataToSend);
    if (result.access_token) {
      dispatch(login(result.access_token));
      navigate("/");
    } else {
      alert(result.error || "An unknown error has occurred");
    }
  };

  return (
    <main>
      <TextWithLinesContainer text={"Iniciar sesión"}></TextWithLinesContainer>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={loginFormStyles["login-form"]}
      >
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
        <PasswordField
          label={"Contraseña"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={loginFormStyles.submitContainer}>
          <IconButton type="submit">
            <ArrowCircleRightOutlinedIcon
              fontSize="large"
              className={loginFormStyles.icon}
            />
          </IconButton>
        </div>
      </form>

      <TextWithLinesContainer text={"ó"}></TextWithLinesContainer>

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
