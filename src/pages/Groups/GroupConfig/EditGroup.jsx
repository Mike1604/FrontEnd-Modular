import { useState, useEffect, useCallback } from "react";
import { useOutletContext, Link } from "react-router";
import { TextField, Button } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import { updateGroup } from "../../../services/groupsSevice";

export default function EditGroup({ group }) {
  const { handleGroupUpdate } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [groupData, setGroupData] = useState({
    group_name: "",
    group_description: "",
    group_picture_path: "",
    group_picture: null,
  });

  useEffect(() => {
    if (group) {
      setGroupData({
        group_name: group.group_name || "",
        group_description: group.group_description || "",
        group_picture_path: group.group_picture_path
          ? `${group.group_picture_path}?t=${Date.now()}`
          : null,
      });
    }
  }, [group]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditable) {
      setIsEditable(true);
      return;
    }

    if (!groupData.group_name.trim()) {
      alert("El nombre del grupo es obligatorio.");
      return;
    }

    setLoading(true);

    try {
      const res = await updateGroup(group.id, groupData);
      let resData = res.groupdata;

      if (resData.group_picture_path) {
        resData = {
          ...resData,
          group_picture_path: resData.group_picture_path
            ? `${resData.group_picture_path}?t=${Date.now()}`
            : "",
        };

        console.log(resData);
      }

      handleGroupUpdate(resData);
      setGroupData({
        group_name: resData.group_name || "",
        group_description: resData.group_description || "",
        group_picture_path: resData.group_picture_path,
        group_picture: null,
      });
    } catch (error) {
      alert("Hubo un error al actualizar el grupo. Inténtalo de nuevo.");
      console.error("Error al actualizar el grupo:", error);
    } finally {
      setLoading(false);
      setIsEditable(false);
    }
  };

  const handleImageCardClick = () => {
    if (!isEditable) {
      return;
    }

    document.getElementById("profile-image-input").click();
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setGroupData((prevData) => ({
        ...prevData,
        group_picture_path: objectURL,
        group_picture: file,
      }));
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="edit-group-form">
      <div className="edit-group-row">
        <div className="edit-group-photo-section">
          <div
            className={`${!isEditable ? "inactive" : ""} upload-card`}
            onClick={handleImageCardClick}
          >
            {!groupData.group_picture_path ? (
              <>
                <GroupsIcon className="upload-btn" />
              </>
            ) : (
              <>
                <img
                  src={groupData.group_picture_path}
                  alt="Preview"
                  className="group-image-preview"
                />
              </>
            )}
            <ModeEditOutlinedIcon
              className={`${!isEditable ? "inactive" : ""} image-edit-icon`}
            />
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

        <div className="edit-group-inputs">
          <TextField
            label="Nombre de grupo"
            value={groupData.group_name}
            onChange={handleChange}
            name="group_name"
            required
            fullWidth
            disabled={!isEditable}
          />
          <TextField
            label="Descripción del grupo"
            multiline
            rows={4}
            placeholder="Escribe una descripción para tu grupo..."
            variant="outlined"
            value={groupData.group_description}
            name="group_description"
            onChange={handleChange}
            fullWidth
            disabled={!isEditable}
          />
        </div>
      </div>

      <div className="form-actions">
        <Button
          className={`${isEditable ? `active` : "inactive"}`}
          variant="outlined"
          color="secondary"
          onClick={() => {
            setIsEditable((prev) => !prev);
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          loading={isLoading}
        >
          {isEditable ? "Guardar" : "Editar"}
        </Button>
      </div>
    </form>
  );
}
