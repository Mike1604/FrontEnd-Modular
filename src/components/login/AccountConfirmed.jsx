import { Button } from "@mui/material";
import { Link } from "react-router";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import loginStyles from "../../pages/Login.module.css";
import TextContainer from "../UI/TextContainer";

export default function AccountConfirmed() {
  return (
    <>
      <h2>Cuenta creada correctamente</h2>
      <div className={loginStyles.submitContainer}>
        <HowToRegOutlinedIcon
          fontSize="large"
          className={loginStyles.iconConfirmation}
        />
      </div>
      <div className={loginStyles.submitContainer}>
        <Link to="/myaccount">
          <Button variant="outlined">
            <h2>Finalizar Registro</h2>
          </Button>
        </Link>
      </div>
      <div className={loginStyles.submitContainer}>
        <Link to="/">
          <Button variant="text" color="secondary">
            <h2>Omitir</h2>
          </Button>
        </Link>
      </div>
      <TextContainer></TextContainer>
    </>
  );
}
