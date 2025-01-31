import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

import { deleteGroup } from "../../../services/groupsSevice";
import EditGroup from "./EditGroup";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import "./GroupConfig.css";

export default function GroupConfig({ group }) {
  const { handleGroupDeleted } = useOutletContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!group || !group.id) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que quieres eliminar este grupo? Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      const result = await deleteGroup(group.id);

      console.log("Grupo eliminado:", result);
      alert("El grupo ha sido eliminado exitosamente.");
      handleGroupDeleted(group.id);
      navigate(`/groups/`);
    } catch (error) {
      console.error("Error al eliminar el grupo:", error);
      alert(
        "Hubo un problema al intentar eliminar el grupo. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="group-config-container">
      <header className="group-info-header">
        <h2>Información del grupo</h2>
      </header>

      <EditGroup group={group} />

      <section>
        <header className="group-info-header">
          <h2>Zona de peligro</h2>
        </header>
        <div className="danger-zone-sect">
          <div className="danger-zone-descr">
            <h2>Eliminar grupo</h2>
            <p>
              Una vez eliminado el grupo no será posible recuperarlo, toda la
              información se perderá, todos los miembros perderán acceso, y las
              estadísticas y datos no serán más accesibles. Considera archivar
              el grupo en caso de querer conservar los datos.
            </p>
          </div>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            loading={isDeleting} // Deshabilita el botón mientras se elimina
          >
            Eliminar
          </Button>
        </div>
      </section>
    </section>
  );
}
