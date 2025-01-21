import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";

import LanguageSelect from "../components/UI/LanguageSelect";

import "./Account.css"; // Importa el archivo CSS global

import {
  getUserData,
  updateUserData,
  updateUserProfilePicture,
} from "../services/userService";

export default function Account() {
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    primary_language: "",
    secondary_language: "",
    profile_picture_path: null,
    profile_picture: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const data = await getUserData(userId);
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            primary_language: data.primary_language || "",
            secondary_language: data.secondary_language || "",
            profile_picture_path: data.profile_picture_path || null,
            profile_picture: null,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = async () => {
    const { profile_picture, profile_picture_path, ...userData } = formData;
    try {
      const res = await updateUserData(userId, userData);

      if (profile_picture) {
        const picRes = await updateUserProfilePicture(userId, profile_picture);
      }
    } catch (error) {
      console.error(error);
    }

    setIsEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile_picture: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarClick = () => {
    if (!isEditable) {
      return;
    }
    document.getElementById("profile-image-input").click();
  };

  if (!formData.email)
    return (
      <div className="accountContainer">
        <CircularProgress />
      </div>
    );

  return (
    <div className="accountContainer">
      <h2 className="section-title">Configuración del usuario</h2>
      <div className="profileSection">
        <div className="profilePictureWrapper" onClick={handleAvatarClick}>
          <Avatar
            src={
              imagePreview ||
              (formData.profile_picture_path
                ? `${formData.profile_picture_path}?t=${new Date().getTime()}`
                : null)
            }
          />

          <EditIcon className={`editIcon ${isEditable ? "editable" : ""}`} />
          <input
            type="file"
            id="profile-image-input"
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div className="userInfo">
          <div className="multiplefields">
            <TextField
              label="Nombre"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!isEditable}
              name="first_name"
            />
            <TextField
              label="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!isEditable}
              name="last_name"
            />
          </div>
          <TextField
            label="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            disabled={!isEditable}
            name="email"
          />
          <div className="multiplefields">
            <LanguageSelect
              label="Idioma Primario"
              name="primary_language"
              value={formData.primary_language}
              handleChange={handleChange}
              disabled={!isEditable}
            />
            <LanguageSelect
              label="Idioma Secundario"
              name="secondary_language"
              value={formData.secondary_language}
              handleChange={handleChange}
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>

      {!isEditable ? (
        <Button onClick={handleEdit}>Editar información</Button>
      ) : (
        <Button onClick={handleSave} variant="outlined">
          Guardar cambios
        </Button>
      )}

      <Button variant="outlined">
        Quiero cambiar mi contraseña o correo electrónico
      </Button>

      <h2 className="section-title"></h2>
    </div>
  );
}
