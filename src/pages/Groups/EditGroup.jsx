import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useOutletContext } from "react-router";
import { Link } from "react-router";
import { TextField, Button } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { getGroup, updateGroup } from "../../services/groupsSevice";

export default function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGroupUpdate } = useOutletContext();
  const userId = useSelector((state) => state.auth.userId);

  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    group_name: "",
    group_description: "",
    group_picture: null,
    owner: userId,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await getGroup(id);
        setFormData({
          group_name: groupData.group_name,
          group_description: groupData.group_description,
          group_picture: groupData.group_picture_path || null,
          owner: groupData.owner,
        });
        if (groupData.group_picture_path) {
          setImagePreview(groupData.group_picture_path);
        }
      } catch (error) {
        console.error("Error al obtener el grupo:", error);
      }
    };

    fetchGroupData();
  }, [id]);

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
      const res = await updateGroup(id, formData);

      if (res && res.updatedGroup) {
        handleGroupUpdate(res.updatedGroup);
        navigate(`/groups/${id}`);
      }
    } catch (error) {
      alert("Hubo un error al actualizar el grupo. Inténtalo de nuevo.");
      console.error("Error al actualizar el grupo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageCardClick = () => {
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
    <div className="edit-group-container">
      <h2 className="title-half-line">Editar Grupo</h2>
      <form className="edit-group-form" onSubmit={handleSubmit}>
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
        <div className="edit-group-input">
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
        <Link to={`/groups/${id}`}>
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
          Guardar cambios
        </Button>
      </div>
    </div>
  );
}
