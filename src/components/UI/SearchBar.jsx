import { TextField, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router";

import "./UIStyles.css";

const searchOptions = [
  { label: "Inicio", path: "/" },
  { label: "Mi cuenta", path: "/myaccount" },
  { label: "Grupos", path: "/groups" },
  { label: "Leitner", path: "/leitner" },
  { label: "Crear Carta", path: "/crear-carta" },
  { label: "Crear Beraja", path: "/crear-baraja" },
];

export default function SearchBar({ className }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredOptions([]);
      return;
    }

    const filtered = searchOptions.filter((option) =>
      option.label.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setFilteredOptions([]);
  };

  return (
    <div className="search-container">
      <TextField
        variant="outlined"
        label="Buscar..."
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className={`search-input ${className || ""}`}
      />

      {filteredOptions.length > 0 && (
        <div className="search-dropdown">
          <List>
            {filteredOptions.map((option, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleOptionClick(option.path)}>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}

      <SearchIcon className={`search-responsive`} />
    </div>
  );
}
