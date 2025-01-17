import { Outlet } from "react-router";
import Sidebar from "../components/home/Sidebar";
import HomeStyles from "../layouts/HomeLayout.module.css";
import NavBar from "../components/UI/NavBar";

export default function HomeLayout() {
  return (
    <div className={HomeStyles["home-container"]}>
      <Sidebar gridClass={HomeStyles["sidebar-grid"]} />
      <NavBar gridClass={HomeStyles["navbar-grid"]} />
      <Outlet className={HomeStyles["outlet-grid"]} />
    </div>
  );
}
