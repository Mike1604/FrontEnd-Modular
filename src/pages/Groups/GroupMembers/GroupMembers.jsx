import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

import AddMemberModal from "./AddMemberModal";
import { getBatchOfUsers } from "../../../services/userService";
import { removeMemberFromGroup } from "../../../services/groupsSevice";

import "./GroupMembers.css";

export default function GroupMembers({ group, isOwner }) {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIds = group.members.map((member) => member.user_id);
        const usersData = await getBatchOfUsers(userIds);

        const combinedMembers = group.members.map((member) => {
          const userInfo = usersData.find((user) => user.id === member.user_id);
          return {
            ...member,
            ...userInfo,
          };
        });

        setMembers(combinedMembers);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    fetchData();
  }, [group]);

  const handleDelete = async (memberId) => {
    try {
      const res = await removeMemberFromGroup(group.id, memberId);

      if (res) {
        setMembers((members) => members.filter((member) => member.id !== memberId));
      }
    } catch (error) {
      alert("Hubo un error al eliminar el miembro del grupo. Inténtalo de nuevo.");
      console.error("Error al eliminar el miembro del grupo:", error);
    }
  };

  const handleMemberAdded = (user) => {
    setMembers((prevMembers) => [...prevMembers, user]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "fullName",
      headerName: "Miembro",
      flex: 1,
      minWidth: 150,
      maxWidth: 300,
      renderCell: (params) => (
        <div className="member-info">
          <Avatar
            alt={params.row.fullName}
            src={params.row.profile_picture_path}
            className="member-photo"
          >
            {params.row.fullName ? params.row.fullName[0] : null}
          </Avatar>
          <span className="member-name">{params.row.fullName}</span>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      maxWidth: 350,
    },
    {
      field: "role",
      headerName: "Rol",
      flex: 0.7,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "since",
      headerName: "Miembro desde",
      flex: 0.7,
      minWidth: 150,
      maxWidth: 250,
    },
  ];

  if (isOwner) {
    columns.push({
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) =>
        params.row.role !== "Admin" ? (
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        ) : null,
    });
  }

  const rows = members.map((member) => ({
    id: member.id,
    fullName: `${member.first_name} ${member.last_name}`,
    email: member.email,
    role: member.role,
    since: new Date(member.since).toLocaleDateString(),
    profile_picture_path: member.profile_picture_path,
  }));

  return (
    <section className="group-section-container">
      <header className="group-members-header">
        <h2>Lista de miembros</h2>
        {isOwner && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GroupAddOutlinedIcon />}
            onClick={handleOpen}
            className="add-member-button"
          >
            Agregar
          </Button>
        )}
      </header>

      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          className="custom-data-grid"
        />
      </div>

      {open && (
        <AddMemberModal
          handleClose={handleClose}
          handleMemberAdded={handleMemberAdded}
          groupId={group.id}
        />
      )}
    </section>
  );
}
