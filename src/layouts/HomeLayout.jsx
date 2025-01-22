import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/home/Sidebar";
import HomeStyles from "../layouts/HomeLayout.module.css";
import NavBar from "../components/home/NavBar";

export default function HomeLayout() {
  const [isSideBarActive, setSidebarActive] = useState(false);

  const onToggleSideBar = () => {
    console.log("here ", isSideBarActive);
    setSidebarActive((prev) => !prev);
  };

  return (
    <div
      className={`${HomeStyles["home-container"]} ${
        isSideBarActive ? HomeStyles.active : ""
      }`}
    >
      <Sidebar
        gridClass={HomeStyles["sidebar-grid"]}
        activeClass={isSideBarActive ? HomeStyles.active : ""}
      />
      <NavBar
        gridClass={HomeStyles["navbar-grid"]}
        onToggleSideBar={onToggleSideBar}
      />
      <main className={HomeStyles["outlet-grid"]}>
        <Outlet />
      </main>
    </div>
  );
}
