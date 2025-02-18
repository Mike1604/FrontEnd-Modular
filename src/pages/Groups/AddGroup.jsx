import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext, Link } from "react-router";
import { TextField, Button } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { createGroup } from "../../services/groupsSevice";

export default function AddGroup() {
  const navigate = useNavigate();
  const { handleNewGroup } = useOutletContext()

  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    group_name: "",
    group_description: "",
    group_picture: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.group_name.trim()) {
      alert("El nombre del grupo es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      const res = await createGroup(formData);

      if (res && res.groupdata) {
        
        handleNewGroup(res.groupdata);
        navigate(`/groups/${res.groupdata.id}`);
      }
    } catch (error) {
      alert("Hubo un error al crear el grupo. Inténtalo de nuevo.");
      console.error("Error al crear el grupo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageCardClick = (e) => {
    document.getElementById("profile-image-input").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        group_picture: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="new-group-container">
      <Link to={"/groups"}>
        <h2 className="title-right-line">Mis grupos</h2>
      </Link>
      <h2 className="title-half-line">Crear Grupo</h2>
      <form className="new-group-form" onSubmit={handleSubmit}>
        <div className="group-photo-section">
          <div className="upload-card" onClick={handleImageCardClick}>
            {!imagePreview ? (
              <FileUploadOutlinedIcon className="upload-btn" />
            ) : (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="group-image-preview"
                />
                <ModeEditOutlinedIcon className="image-edit-icon" />
              </>
            )}
            <input
              type="file"
              id="profile-image-input"
              style={{ display: "none" }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <h3>Foto de grupo</h3>
        </div>
        <div className="new-group-input">
          <TextField
            label="Nombre de grupo"
            value={formData.group_name}
            onChange={handleChange}
            name="group_name"
            required
            fullWidth
          />
          <TextField
            label="Descripción del grupo"
            multiline
            rows={4}
            placeholder="Escribe una descripción para tu grupo..."
            variant="outlined"
            value={formData.group_description}
            name="group_description"
            onChange={handleChange}
            fullWidth
          />
        </div>
      </form>
      <div className="form-actions">
        <Link to={"/groups"}>
          <Button variant="outlined" color="secondary">
            Cancelar
          </Button>
        </Link>
        <Button
          loading={isLoading}
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </div>
    </div>
  );
}
