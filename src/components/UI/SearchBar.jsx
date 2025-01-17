import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export default function SearchBar({className}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    console.log(searchTerm);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      label="Buscar..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      className={`${className || ''}`}
    />
  );
}
