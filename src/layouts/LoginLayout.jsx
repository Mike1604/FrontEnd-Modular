import { Outlet } from "react-router";
import LoginHeader from "../components/login/LoginHeader";
import styles from "./LoginLayout.module.css";

export default function LoginLayout(props) {
  console.log(props);

  return (
    <div className={styles["login-container"]}>
      <LoginHeader></LoginHeader>
      <Outlet></Outlet>
    </div>
  );
}
