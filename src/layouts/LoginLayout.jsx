import { Outlet } from "react-router";
import GlotoolsHeader from "../components/login/GloToolsHeader";
import styles from "./LoginLayout.module.css";

export default function LoginLayout(props) {
  console.log(props);

  return (
    <div className={styles["login-container"]}>
      <GlotoolsHeader></GlotoolsHeader>
      <Outlet></Outlet>
    </div>
  );
}
