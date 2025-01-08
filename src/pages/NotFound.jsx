import { Button } from "@mui/material";
import { Link } from "react-router";
import GlotoolsHeader from "../components/login/GloToolsHeader";
import notFoundStyles from "../pages/NotFound.module.css";

export default function NotFound() {
  return (
    <div className={notFoundStyles["notfound-container"]}>
      <GlotoolsHeader></GlotoolsHeader>
      <h1>Oops! </h1>
      <h2>The page you are looking for does not exist.</h2>
      <h2>Check the URL or go back to the homepage.</h2>
      <Link to="/">
        <Button variant="outlined">
          <h2>Volver a home</h2>
        </Button>
      </Link>
    </div>
  );
}
