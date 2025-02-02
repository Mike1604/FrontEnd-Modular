import { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import { searchEmails } from "../../../services/userService";
import { addMemberToGroup } from "../../../services/groupsSevice";

export default function AddMemberModal({
  handleClose,
  handleMemberAdded,
  groupId,
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await searchEmails(query);
        setSuggestions(res);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchUsers, 300); // Evita múltiples llamadas innecesarias
    return () => clearTimeout(timeout);
  }, [query]);

  const handleAddMember = async () => {
    setLoading(true);

    try {
      const res = await addMemberToGroup(groupId, selectedUser.id);

      if (res.new_member) {
        const userInfo = {
          ...selectedUser,
          ...res.new_member,
          role: res.new_member.role
        };
        handleMemberAdded(userInfo);
      }
    } catch (error) {
      alert(
        "Hubo un error al agregar el miembro a el grupo. Inténtalo de nuevo."
      );
      console.error("Error al agregar el miembro al grupo:", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Agregar nuevo miembro</h3>
        <input
          type="text"
          placeholder="Buscar por correo"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="modal-input"
        />
        {loading && <CircularProgress size={20} />}
        {suggestions.length > 0 && (
          <List className="suggestions-list">
            {suggestions.map((user) => (
              <ListItem
                component="div"
                key={user.id}
                className={`suggestion-item ${
                  selectedUser?.id === user.id ? "selected" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={user.email}
                />
              </ListItem>
            ))}
          </List>
        )}
        <div className="modal-actions">
          <Button
            variant="outlined"
            onClick={handleAddMember}
            disabled={!selectedUser}
            className="modal-add-button"
          >
            Agregar
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            className="modal-close-button"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
