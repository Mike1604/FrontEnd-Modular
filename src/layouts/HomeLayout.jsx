import { Outlet } from "react-router";
import Sidebar from "../components/home/Sidebar";
import HomeStyles from "../layouts/HomeLayout.module.css";
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function HomeLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className={HomeStyles["home-container"]}>
      <Sidebar />
      <div>
        <nav>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: ( 
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ width: "100%", maxWidth: 400 }}
          />
        </nav>
        <div className={HomeStyles["outlet-container"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

