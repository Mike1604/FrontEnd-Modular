import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const LanguageSelect = ({ label, name, value, handleChange }) => {
  const languages = ["English", "Spanish", "French", "German", "Italian"];
  
  return (
    <FormControl required margin="normal" fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        label={label}
        displayEmpty
      >
        {languages.map((language, index) => (
          <MenuItem key={index} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
