import { Outlet } from "react-router";
import Sidebar from "../components/home/Sidebar";
import HomeStyles from "../layouts/HomeLayout.module.css";
import NavBar from "../components/home/NavBar";

export default function HomeLayout() {
  return (
    <div className={HomeStyles["home-container"]}>
      <Sidebar gridClass={HomeStyles["sidebar-grid"]} />
      <NavBar gridClass={HomeStyles["navbar-grid"]} />
      <main className={HomeStyles["outlet-grid"]}>
        <Outlet />
      </main>
    </div>
  );
}
