import { useState } from "react";
import {
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

import { Link } from "react-router";

import loginFormStyles from "../pages/Login.module.css";
import TextContainer from "../components/UI/TextContainer";
import AccountConfirmed from "../components/login/AccountConfirmed";
import PasswordField from "../components/UI/PasswordField";
import LanguageSelect from "../components/UI/LanguageSelect";

const StepOne = ({ formData, handleChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="first_name"
      label="Nombre"
      name="first_name"
      autoComplete="name"
      autoFocus
      value={formData.first_name}
      onChange={handleChange}
    />

    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="last_name"
      label="Apellido"
      name="last_name"
      autoComplete="name"
      value={formData.last_name}
      onChange={handleChange}
    />

    <div className={loginFormStyles["language-cont"]}>
      <LanguageSelect
        label={"Primary Language"}
        name={"primary_language"}
        value={formData.primary_language}
        handleChange={handleChange}
      />

      <LanguageSelect
        label={"Secondary Language"}
        name={"secondary_language"}
        value={formData.secondary_language}
        handleChange={handleChange}
      />
    </div>
  </>
);

const StepTwo = ({ formData, handleChange }) => (
  <>
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Correo electrónico"
      name="email"
      autoComplete="email"
      value={formData.email}
      onChange={handleChange}
    />

    <PasswordField
      label="Contraseña"
      value={formData.password}
      onChange={(e) =>
        handleChange({ target: { name: "password", value: e.target.value } })
      }
    />

    <PasswordField
      label="Confirmar Contraseña"
      value={formData.passwordConfirmation}
      onChange={(e) =>
        handleChange({
          target: { name: "passwordConfirmation", value: e.target.value },
        })
      }
    />
  </>
);

export default function SignUp() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    primary_language: "Spanish",
    secondary_language: "English",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStepBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 2) {
      setStep((prev) => prev + 1);
      return;
    }

    const dataToSend = { ...formData };
    delete dataToSend.passwordConfirmation;

    console.log("User received", dataToSend);

    try {
      const response = await fetch("http://localhost:8001/users/", {
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
      console.log("Usuario registrado con éxito:", result);
      setConfirmationVisible(true);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <main>
      <TextContainer text="Crear Cuenta" />
      {confirmationVisible ? (
        <AccountConfirmed />
      ) : (
        <>
          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <StepOne formData={formData} handleChange={handleChange} />
            )}
            {step === 2 && (
              <StepTwo formData={formData} handleChange={handleChange} />
            )}

            <div className={loginFormStyles.submitContainer}>
              <IconButton onClick={handleStepBack}>
                <ArrowCircleLeftOutlinedIcon
                  fontSize="large"
                  className={loginFormStyles.icon}
                />
              </IconButton>
              <IconButton type="submit">
                <ArrowCircleRightOutlinedIcon
                  fontSize="large"
                  className={loginFormStyles.icon}
                />
              </IconButton>
            </div>
          </form>
          
          <TextContainer text="ó" />

          <div className={loginFormStyles.submitContainer}>
            <Link to="/login">
              <Button variant="text">
                <h2>Ingresar a una cuenta existente</h2>
              </Button>
            </Link>
          </div>

          <div className={loginFormStyles.submitContainer}>
            <Button variant="text" color="secondary">
              <h2>¿No recuerdas tu usuario o contraseña?</h2>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
